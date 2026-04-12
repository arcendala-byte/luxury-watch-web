import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET() {
  try {
    const [products, orders, users] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
    ]);

    const allOrders = await prisma.order.findMany({
      select: { total: true },
    });

    const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      totalProducts: products,
      totalOrders: orders,
      totalUsers: users,
      totalRevenue,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
