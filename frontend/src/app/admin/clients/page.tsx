// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client'; // Import Client interface

const ClientsPage = async () => {
  // Fetch clients data from the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
    credentials: 'include', // Include cookies
  });

  if (!res.ok) {
    return <div>Error loading clients.</div>;
  }

  const clients: Client[] = await res.json(); // Parse JSON response

  return (
    <BaseListDetailsPage
      data={clients}
      renderItem={(client: Client) => (
        <span>{client.user.first_name} {client.user.last_name}</span> // Access client user details
      )}
      renderDetails={(client: Client) => (
        <div>
          <h2>{client.user.first_name} {client.user.last_name}</h2>
          <p>Email: {client.user.email}</p>
          <p>Phone: {client.user.phone_number}</p>
          <p>Training Status: {client.training_status}</p>
          {/* More client details */}
        </div>
      )}
    />
  );
};

export default ClientsPage;
