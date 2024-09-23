import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  console.log('Access Token:', accessToken);


  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Allow the request to continue if access token exists
  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*', '/protected/:path*'],
};
