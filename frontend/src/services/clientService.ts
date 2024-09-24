// File: src/services/clientService.ts
import { Client } from '../interfaces/client';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchClients = async (): Promise<Client[]> => {
  const cookieStore = cookies();  // Fetch cookies on the server side
  const accessToken = cookieStore.get('access_token')?.value;  // Get the access token

  if (!accessToken) {
    throw new Error('No access token available');
  }

  const res = await fetch(`${API_BASE_URL}/admin/clients/`, {
    credentials: 'include',  // Include credentials for cookies
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
