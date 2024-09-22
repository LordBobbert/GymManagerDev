// File: app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '../../../../interfaces/User'; // Adjust the import path as needed

// Access your API base URL from the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to authenticate against your Django backend
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
    return null;  // Authentication failed
  }

  const userData = await res.json();
  return userData;  // The user data returned from Django on successful authentication
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
        if (!credentials) {
          return null;
        }

        // Delegate authentication to Django backend using the environment variable
        const user = await authenticateWithDjango(credentials.username, credentials.password);

        if (!user) {
          return null;  // Authentication failed
        }

        // Return the user object (you can adjust the fields as per your User interface)
        return {
          id: String(user.id),  // Ensure id is a string as per next-auth expectations
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: user.roles  // Adjust according to your backend's response
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',  // Use JWT for session tokens
  },
  pages: {
    signIn: '/auth/login',  // Redirect to login page on failure
  }
};

export default NextAuth(authOptions);
