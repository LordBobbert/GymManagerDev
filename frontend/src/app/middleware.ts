import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  // Redirect to login if no access token is present
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Optionally: Fetch user data and check if the user is an admin
  // (you can perform this check in the backend API and use HTTP status codes for validation)

  // Continue the request if access token exists
  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ['/admin/:path*'],  // Middleware will protect all admin routes
};
