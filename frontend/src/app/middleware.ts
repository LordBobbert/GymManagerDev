import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current_user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const userData = await response.json();

    if (!userData.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/403', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],  // Apply middleware to admin and API routes
};
