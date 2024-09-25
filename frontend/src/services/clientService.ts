// File: src/services/clientService.ts
import { Client } from '../interfaces/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchClients = async (accessToken: string): Promise<Client[] | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user-management/clients/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch clients');
    }

    const clients: Client[] = await res.json();
    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return null;
  }
};
