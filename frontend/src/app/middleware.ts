// File: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Fetch the current user's data, relying on the cookie for authentication
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
      method: 'GET',
      credentials: 'include',  // Ensures the cookies are included in the request
    });

    // Handle case where user fetch fails (e.g., invalid token, unauthorized, etc.)
    if (!response.ok) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const userData = await response.json();

    // If the user does not have the 'admin' role, redirect to 403 page
    if (!userData.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/403', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();

  } catch (error) {
    // Log or handle error (optional)
    console.error('Error fetching current user:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Apply middleware to protect the /admin routes
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],  // Middleware applies to admin routes
};
