// File: src/services/clientService.ts
import { Client } from '../interfaces/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch clients with Bearer token authorization
export const fetchClients = async (accessToken: string): Promise<Client[] | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clients/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // Include Bearer token in headers
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // Include cookies if necessary
    });

    if (!res.ok) {
      throw new Error('Failed to load clients');
    }

    const clients = await res.json();
    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return null;
  }
};
