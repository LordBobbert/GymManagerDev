// File: src/services/clientService.ts

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
