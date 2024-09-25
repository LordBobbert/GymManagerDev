// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';
import { clientFieldConfig } from '../../../config/fieldConfigs';
import { fetchClients } from '../../../services/clientService';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); // Allow null for selectedClient
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleClientSave = (updatedClient: Client) => {
    console.log('Client saved:', updatedClient);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Client List</h2>
      {/* Render the client list */}
      <ul>
        {clients.map((client) => (
          <li key={client.user.id} onClick={() => handleClientSelect(client)}>
            {client.user.first_name} {client.user.last_name}
          </li>
        ))}
      </ul>

      {/* Conditionally render the BaseListDetailsPage if a client is selected */}
      {selectedClient ? (
        <BaseListDetailsPage
          data={selectedClient}
          fieldConfig={clientFieldConfig}
          onSave={handleClientSave}
        />
      ) : (
        <div>Please select a client to view details.</div>
      )}
    </div>
  );
};

export default ClientsPage;
