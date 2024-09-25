// File: src/services/clientService.ts
import { Client } from '../interfaces/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch clients from the correct API endpoint
export const fetchClients = async (accessToken: string): Promise<Client[]> => {
  const res = await fetch(`${API_BASE_URL}/api/user-management/clients/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch clients.');
  }

  return res.json();
};
