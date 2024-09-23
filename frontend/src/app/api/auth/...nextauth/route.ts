// File: app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '../../../../interfaces/User'; // Adjust the import path as needed

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function authenticateWithDjango(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/user-management/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
  });

  if (!res.ok) {
    return null;
  }

  const userData = await res.json();
  return userData;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: { username: string, password: string } | undefined): Promise<User | null> {
        if (!credentials) return null;

        const user = await authenticateWithDjango(credentials.username, credentials.password);

        if (!user) return null;

        return {
          id: String(user.id),
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: user.roles
        };
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' }
};

export default NextAuth(authOptions);
