// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

// Fetch the client data server-side using cookies
const ClientsPage = async () => {
  try {
    // Fetch clients data from the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
      credentials: 'include',  // Ensure cookies are included in cross-origin requests
    });

    if (!res.ok) {
      throw new Error('Failed to fetch clients');
    }

    const clients: Client[] = await res.json();  // Parse response as an array of clients

    // Pass the clients array as 'data' to the Client Component
    return <BaseListDetailsPage data={clients} />;
  } catch (error) {
    // Display an error if something goes wrong
    console.error('Error fetching clients:', error);
    return <div>Error loading clients.</div>;
  }
};

export default ClientsPage;
