// File: src/app/admin/clients/page.tsx
import { cookies } from 'next/headers'; // Import cookies utility
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

const ClientsPage = async () => {
  const cookieStore = cookies();  // Access cookies on the server
  const accessToken = cookieStore.get('access_token')?.value;  // Retrieve token

  if (!accessToken) {
    return <div>You must be logged in to view this page.</div>;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Use token from cookies
    },
  });

  if (!res.ok) {
    return <div>Error loading clients</div>;
  }

  const clients: Client[] = await res.json();

  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  return (
    <BaseListDetailsPage data={clients} getItemText={getItemText} getItemDetails={getItemDetails} />
  );
};

export default ClientsPage;
