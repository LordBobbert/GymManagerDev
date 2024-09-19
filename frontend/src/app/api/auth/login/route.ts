// File: app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Call next-auth's signIn method
  const result = await signIn('credentials', {
    redirect: false,
    username,
    password,
  });

  // Handle authentication failure
  if (result?.error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // If successful, return a success response
  return NextResponse.json({ success: true });
}
