// File: src/app/admin/clients/page.tsx 
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface
import { cookies } from 'next/headers';

const ClientsPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return <div>You must be logged in to view clients.</div>;  // Ensure user is logged in
  }

  // Fetch clients data from the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
    credentials: 'include',  // Include cookies
    headers: {
      'Authorization': `Bearer ${accessToken}`  // Add Authorization header
    }
  });

  if (!res.ok) {
    return <div>Error loading clients.</div>;
  }

  const clients: Client[] = await res.json();  // Ensure clients are properly typed

  // Pass the clients array as 'data' to the Client Component
  return <BaseListDetailsPage data={clients} />;
};

export default ClientsPage;
