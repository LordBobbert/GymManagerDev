// File: middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  // Redirect to login if no access token
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));  // Corrected redirection path
  }

  // Allow the request to continue if access token exists
  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*', '/protected/:path*'],  // Protect these routes
};
