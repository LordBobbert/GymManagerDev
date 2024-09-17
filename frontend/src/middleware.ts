import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect server-side routes
export function middleware(request: NextRequest) {
    // Check for a session cookie (e.g., a JWT token)
    const token = request.cookies.get('access_token');

    // If no token exists, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Continue with the request
    return NextResponse.next();
}

// Apply this middleware to protected routes only
export const config = {
    matcher: ['/admin/:path*', '/trainer/:path*'], // Adjust paths to the routes you want to protect
};
