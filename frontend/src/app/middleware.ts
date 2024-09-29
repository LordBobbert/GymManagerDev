// File: src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Extract the access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // If no access token, redirect to the login page
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Fetch current user data, authenticated with the Bearer token in the Authorization header
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/auth/current_user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Add the access token as a Bearer token
        'Content-Type': 'application/json',
      },
    });

    // If the response is not OK, redirect to login
    if (!res.ok) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Parse the user data from the response
    const userData = await res.json();

    // If the user is not an admin, redirect to a 403 page
    if (!userData.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/403', request.url));
    }

    // Allow the request to proceed if the user is authenticated and has the admin role
    return NextResponse.next();

  } catch (error) {
    console.error('Error during user authentication in middleware:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Apply middleware to protect admin-related routes
export const config = {
  matcher: ['/admin/:path*', '/api/user-management/:path*'], // Protect admin and user-management API routes
};
