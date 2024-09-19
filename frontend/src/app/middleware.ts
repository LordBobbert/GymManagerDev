// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authCookie = request.cookies.get('access_token'); // Replace with your cookie name

    // If no valid cookie, redirect to login
    if (!authCookie) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Otherwise, continue with the request
    return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
    matcher: ['/admin/:path*', '/protected/:path*'], // Protect these routes
};
