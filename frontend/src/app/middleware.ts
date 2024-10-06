// File: src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/auth/current_user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const userData = await res.json();

    if (!userData.roles.includes('admin')) {
      return NextResponse.redirect(new URL('/403', request.url));
    }

    return NextResponse.next();

  } catch (error) {
    console.error('Error during user authentication in middleware:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/user-management/:path*'],
};
