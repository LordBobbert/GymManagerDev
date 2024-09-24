// File: src/app/admin/clients/page.tsx
// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface

const ClientsPage = async () => {
  try {
    // Fetch clients data from the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
      credentials: 'include',  // Ensure cookies are included
    });

    // Check if the response is HTML (indicating a redirect to login page)
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      return <div>You must be logged in to view clients.</div>;
    }

    if (!res.ok) {
      throw new Error('Error loading clients.');
    }

    const clients: Client[] = await res.json();  // Parse the JSON response

    // Pass the clients array as 'data' to the Client Component
    return <BaseListDetailsPage data={clients} />;
  } catch (error) {
    console.error('Error loading clients:', error);
    return <div>Error loading clients.</div>;
  }
};

export default ClientsPage;

