"use client";

// File: src/app/admin/clients/page.tsx

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../services/clientService';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <BaseListDetailsPage
      data={clients}
      renderItem={(client) => (
        <span>
          {client.user.first_name} {client.user.last_name}
        </span>
      )}
      renderDetails={(client) => (
        <div>
          <h2>
            {client.user.first_name} {client.user.last_name}
          </h2>
          <p>Email: {client.user.email}</p>
          <p>Phone: {client.user.phone_number}</p>
          <p>Training Status: {client.training_status}</p>
        </div>
      )}
      section="clients" // Pass the section as 'clients' to show 'Add Client' button
    />
  );
};

export default ClientsPage;
