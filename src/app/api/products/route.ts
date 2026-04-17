import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          brand: true,
          slug: true,
          price: true,
          image: true,
          description: true,
          stock: true,
        },
      });
      if (!product) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        slug: true,
        price: true,
        image: true,
        description: true,
        stock: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
