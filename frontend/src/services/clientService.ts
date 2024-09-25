// File: src/services/clientService.ts

import { Client } from '../interfaces/client';

export const fetchClients = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/clients/`, {
    method: 'GET',
    credentials: 'include',  // Automatically include cookies
  });

  if (!res.ok) {
    throw new Error('Failed to fetch clients');
  }

  return await res.json();
};

export const addClient = async (newClient: Omit<Client, 'id'>): Promise<Client> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/clients/`, {
    method: 'POST',
    credentials: 'include',  // Automatically include cookies
    body: JSON.stringify(newClient),
  });

  if (!response.ok) throw new Error('Failed to add client');
  return response.json();
};
