// File: src/services/authService.ts
import { handleResponse } from '@/utils/apiHelpers';
import { User } from '../interfaces/user';

const authUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`;

export const login = async (username: string, password: string) => {
  const res = await fetch(`${authUrl}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  return handleResponse(res, 'Failed to login');
};

export const logout = async () => {
  const res = await fetch(`${authUrl}/logout/`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res, 'Failed to logout');
};

export const checkAuthStatus = async () => {
  const res = await fetch(`${authUrl}/status/`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res, 'Failed to check authentication status');
};

export const register = async (newUser: Omit<User, 'id'>) => {
  const res = await fetch(`${authUrl}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
    credentials: 'include',
  });
  return handleResponse(res, 'Failed to register');
};
