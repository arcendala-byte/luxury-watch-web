import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // 1. Set params as a Promise
) {
  try {
    // 2. Await the params to get the ID
    const { id } = await params;
    
    // 3. Parse the ID to an integer for Prisma
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid Product ID' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}