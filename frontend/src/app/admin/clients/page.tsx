// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

const ClientsPage = async () => {
  // Fetch clients data from the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
    credentials: 'include',  // Ensure cookies are sent
  });

  if (!res.ok) {
    return <div>Error loading clients.</div>;  // Handle the error
  }

  const clients: Client[] = await res.json();
  return <BaseListDetailsPage data={clients} />;
};

export default ClientsPage;
