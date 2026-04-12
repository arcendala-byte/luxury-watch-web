// src/app/api/admin/orders/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function PATCH(
  request: NextRequest, // Changed to NextRequest for better type support
  { params }: { params: Promise<{ id: string }> } // params is now a Promise in Next.js 16
) {
  try {
    // 1. Await the params to get the ID
    const { id } = await params;
    
    // 2. Get the body data
    const { status } = await request.json();
    
    // 3. Convert the ID to a number for Prisma
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true } } } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}