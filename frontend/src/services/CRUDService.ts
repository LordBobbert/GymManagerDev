// File: src/services/CRUDService.ts

import { handleResponse } from '@/utils/apiHelpers';

export const CRUDService = {
  // Generic fetchAll function
  async fetchAll<T>(url: string): Promise<T[]> {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(res, `Failed to fetch items from ${url}`);
  },

  // Generic fetchById function
  async fetchById<T>(url: string, id: number): Promise<T> {
    const res = await fetch(`${url}/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    return handleResponse(res, `Failed to fetch item with ID ${id} from ${url}`);
  },

  // Generic create function
  async create<T>(url: string, data: Partial<T>): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(res, `Failed to create item in ${url}`);
  },

  // Generic update function
  async update<T>(url: string, id: number, data: Partial<T>): Promise<T> {
    const res = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(res, `Failed to update item with ID ${id} in ${url}`);
  },

  // Generic delete function
  async delete(url: string, id: number): Promise<void> {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    await handleResponse(res, `Failed to delete item with ID ${id} from ${url}`);
  },
};
