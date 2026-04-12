import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';
import { Product } from '@/types/product';

interface CartItem {
  productId: number;
  quantity: number;
}

interface OrderRequest {
  userId: number;
  cartItems: CartItem[];
  shipping?: Record<string, any>; // free‑form shipping information
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();
    const { userId, cartItems, shipping } = body;

    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // load the products referenced in the cart
    const productIds = cartItems.map((i) => i.productId);
    const products: Product[] = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // make sure each cart item corresponds to a product and has enough stock
    for (const item of cartItems) {
      const product = products.find((p: Product) => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 });
      }
      if (item.quantity > product.stock) {
        return NextResponse.json({
          error: `Insufficient stock for product ${product.name}`,
        }, { status: 400 });
      }
    }

    // compute total as a float using the numeric portion of the price string
    const total = cartItems.reduce((acc, item) => {
      const product = products.find((p: Product) => p.id === item.productId)!;
      const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
      return acc + priceNum * item.quantity;
    }, 0);

    // perform transaction: decrement stock and create order + items
    const order = await prisma.$transaction(async (tx: any) => {
      // decrement stock
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // create the order record
      const created = await tx.order.create({
        data: {
          user: { connect: { id: userId } },
          total,
          status: 'pending',
          items: {
            create: cartItems.map((item) => ({
              product: { connect: { id: item.productId } },
              quantity: item.quantity,
              price: parseFloat(
                products
                  .find((p: Product) => p.id === item.productId)!
                  .price.replace(/[^0-9.]/g, '') || '0'
              ),
            })),
          },
        },
      });

      return created;
    });

    // you could store shipping info elsewhere or send to a fulfillment service

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('order creation error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
