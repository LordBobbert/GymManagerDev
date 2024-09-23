// File: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Verify if the user is an admin by fetching the current user's data
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/auth/login', request.url));  // Redirect if the user fetch fails
  }

  const userData = await response.json();

  // If the user does not have the 'admin' role, redirect to 403 page
  if (!userData.roles.includes('admin')) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  // Allow the request if the user is authenticated and is an admin
  return NextResponse.next();
}

// Protect the /admin routes
export const config = {
  matcher: ['/admin/:path*'],  // Middleware applies to admin routes
};
