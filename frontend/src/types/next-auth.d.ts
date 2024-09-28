// File: src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      roles?: string[];
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    roles?: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    roles?: string[];
  }
}
