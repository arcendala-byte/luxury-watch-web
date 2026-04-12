import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> } // 1. Update params to a Promise
) {
  try {
    // 2. Await the params to get the ID
    const { id } = await params;
    
    // 3. Convert the string ID to a number for Prisma
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}