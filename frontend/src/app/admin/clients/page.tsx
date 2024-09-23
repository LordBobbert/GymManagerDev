// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';

const ClientsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
    credentials: 'include',  // Include cookies for authentication
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      // This is likely the login page HTML being returned
      return <div>You must be logged in to view this page.</div>;
    }
    return <div>Error loading clients.</div>;
  }

  const clients: Client[] = await res.json();
  return <BaseListDetailsPage data={clients} />;
};


export default ClientsPage;
