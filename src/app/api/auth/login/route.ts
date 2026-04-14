import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      // Create the session
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
      const session = await encrypt({ email, expires });

      // Save the session in an HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('session', session, { 
        expires, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
