import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/api/admin'];
const publicRoutes = ['/admin/login', '/signup', '/'];

export async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get('session')?.value;
  let session = null;
  
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (e) {
      console.error("Middleware Auth Error: Invalid Session");
    }
  }

  // 4. Redirect to /admin/login if the user is not authenticated
  if (isProtectedRoute && !session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  // 5. Redirect to /admin if the user is authenticated and trying to access login
  if (
    isPublicRoute &&
    session &&
    path === '/admin/login' &&
    !path.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
