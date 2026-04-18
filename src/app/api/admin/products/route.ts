import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, brand, price, stock, description, image,
      caseMaterial, caseSize, thickness, movement,
      caliber, powerReserve, dialColor, dialPattern,
      bracelet, clasp, features, curatorNotes 
    } = body;

    // Create a URL-friendly slug (e.g., "Royal Oak" -> "royal-oak")
    const slug = name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        slug,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image, // Base64 string from your upload component
        caseMaterial,
        caseSize,
        thickness,
        movement,
        caliber,
        powerReserve,
        dialColor,
        dialPattern,
        bracelet,
        clasp,
        features,
        curatorNotes,
        status: 'ACTIVE'
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Vault Entry Error:', error);
    return NextResponse.json(
      { error: 'Failed to archive the piece in the digital vault.' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve catalog' }, { status: 500 });
  }
}