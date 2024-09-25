// File: src/services/clientService.ts
import { Client } from '../interfaces/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchClients(accessToken: string): Promise<Client[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user-management/clients/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Add the Bearer token to headers
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to fetch clients:', response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return null;
  }
}
