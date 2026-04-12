import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand,
        slug: body.slug,
        price: body.price,
        image: body.image,
        description: body.description,
        stock: body.stock,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
