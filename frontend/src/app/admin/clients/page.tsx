// File: src/app/admin/clients/page.tsx

import { cookies } from 'next/headers';
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

const ClientsPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return <div>You must be logged in to view clients.</div>;
  }

  // Fetch data from the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return <div>Error loading clients.</div>;
  }

  const clients: Client[] = await res.json(); // Only pass serializable data

  return <BaseListDetailsPage data={clients} />; // Pass only data, no functions
};

export default ClientsPage;
