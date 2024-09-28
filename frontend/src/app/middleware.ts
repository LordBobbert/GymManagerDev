// File: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Extract the token using NextAuth's `getToken` utility
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to login if token is missing
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If the user does not have the admin role, redirect to forbidden page
  if (token.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  // Allow the request to proceed if the token is valid and user is admin
  return NextResponse.next();
}

// Protect admin and user-management API routes
export const config = {
  matcher: ['/admin/:path*', '/api/user-management/:path*'],
};
