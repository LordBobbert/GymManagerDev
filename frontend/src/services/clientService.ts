// File: services/clientService.ts
import { Client } from '../interfaces/client';

export async function getClientsList(): Promise<Client[]> {
  const res = await fetch('/api/clients');
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  return res.json();
}

export async function getClientDetails(clientId: number): Promise<Client> {
  const res = await fetch(`/api/clients/${clientId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client details");
  }
  return res.json();
}
