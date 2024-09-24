// File: src/services/clientService.ts
import { Client } from '../interfaces/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAccessTokenFromCookies(): string | null {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});
  return cookies['access_token'] || null;
}

export const fetchClients = async (): Promise<Client[]> => {
  const accessToken = getAccessTokenFromCookies();  // Get the access token from cookies

  if (!accessToken) {
    throw new Error('No access token available');
  }

  const res = await fetch(`${API_BASE_URL}/admin/clients/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Attach Bearer token
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error fetching clients');
  }

  return res.json();  // Return the parsed client data
};
