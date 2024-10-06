// File: src/services/authService.ts

import { User } from '../interfaces/user';

// Login user
export const login = async (username: string, password: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to log in');
  }

  return await res.json();
};

// Logout user
export const logout = async (): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout/`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to log out');
  }
};

// Check authentication status
export const checkAuthStatus = async (): Promise<User | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/status/`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
};

// Register new user (if applicable)
export const register = async (newUser: Omit<User, 'id'>): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to register');
  }

  return await res.json();
};
