import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET || '';

// utility - convert price string to naira (in kobo for Paystack)
function priceToKobo(price: string) {
  const num = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
  return Math.round(num * 100);
}

// verify Paystack webhook signature
function verifyPaystackSignature(body: string, sig: string): boolean {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  return hash === sig;
}

export async function POST(req: Request) {
  const sig = req.headers.get('x-paystack-signature');

  // if paystack signature header present, treat as webhook
  if (sig) {
    const body = await req.text();
    if (!verifyPaystackSignature(body, sig)) {
      console.error('Paystack webhook signature verification failed');
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);

    // handle charge.success event
    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data;
      const orderId = metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: parseInt(orderId, 10) },
          data: { status: 'paid' },
        });
      }
    }

    return new NextResponse(null, { status: 200 });
  }

  // otherwise create a Paystack transaction
  const { orderId } = await req.json();
  if (!orderId) {
    return NextResponse.json({ error: 'orderId required' }, { status: 400 });
  }

  // fetch order with items and product data
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // compute total amount in kobo
  const amount = Math.round(order.total * 100);

  try {
    // create Paystack transaction
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: order.user?.email || 'customer@example.com',
        amount,
        reference: `order-${orderId}-${Date.now()}`,
        metadata: {
          orderId,
        },
        callback_url: `${
          req.headers.get('x-forwarded-proto') || 'http'
        }://${req.headers.get('host')}/verify-payment`,
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { error: 'Failed to initialize Paystack transaction' },
        { status: 400 }
      );
    }

    // redirect to Paystack authorization URL
    return NextResponse.redirect(paystackData.data.authorization_url);
  } catch (error) {
    console.error('Paystack error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
