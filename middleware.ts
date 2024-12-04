import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Protected routes that require authentication
const protectedRoutes = {
  user: ['/cart', '/checkout', '/account', '/dashboard'],
  admin: ['/admin/dashboard', '/admin/products', '/admin/orders', '/admin/categories', '/admin/stock', '/admin/reviews'],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const path = request.nextUrl.pathname;

  // Check if path is protected
  const isAdminRoute = path.startsWith('/admin');
  const isProtected = isAdminRoute
    ? protectedRoutes.admin.some(route => path.startsWith(route))
    : protectedRoutes.user.some(route => path.startsWith(route));

  if (isProtected) {
    if (!token) {
      // Redirect to appropriate login page
      const loginPath = isAdminRoute ? '/admin/login' : '/login';
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set('returnUrl', path);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      // Verify token and check role
      const payload = await verifyToken(token);
      const hasAccess = isAdminRoute 
        ? payload.role === 'admin'
        : payload.role === 'user';

      if (!hasAccess) {
        // Redirect to appropriate home page if role doesn't match
        const homePath = isAdminRoute ? '/' : '/admin/login';
        return NextResponse.redirect(new URL(homePath, request.url));
      }
    } catch (error) {
      // Token is invalid, redirect to login
      const loginPath = isAdminRoute ? '/admin/login' : '/login';
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set('returnUrl', path);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/account/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};