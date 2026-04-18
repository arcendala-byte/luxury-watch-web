import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET() {
  try {
    // 1. Fetch users with their order counts
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,    // Ensure your schema has 'ADMIN' | 'CLIENT' | 'CONCIERGE'
        status: true,  // Ensure your schema has 'ACTIVE' | 'SUSPENDED' | 'PENDING'
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { 
        createdAt: 'desc' 
      },
    });

    // 2. Transform data to match the frontend 'User' interface
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name || 'Anonymous Member',
      email: user.email,
      role: user.role || 'CLIENT',
      status: user.status || 'ACTIVE',
      joinedDate: user.createdAt,
      totalOrders: user._count.orders,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Registry Sync Error:', error);
    return NextResponse.json(
      { error: 'Failed to synchronize with the user vault' }, 
      { status: 500 }
    );
  }
}

/** * Protocol: Secure Invite / New User Creation 
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, role } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: role || 'CLIENT',
        status: 'PENDING',
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Member Creation Friction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}