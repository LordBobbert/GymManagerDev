// File: src/services/clientService.ts

import { Client } from '../interfaces/client';

export const fetchClients = async (): Promise<Client[]> => {
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newClient),
  });

  if (!response.ok) throw new Error('Failed to add client');
  return response.json();
};

export const updateClient = async (id: number, updatedFields: Partial<Client>): Promise<Client> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/clients/${id}/`, {
    method: 'PATCH',
    credentials: 'include',  // Automatically include cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),  // Send only modified fields
  });

  if (!response.ok) {
    throw new Error('Failed to update client');
  }

  return response.json();
};
