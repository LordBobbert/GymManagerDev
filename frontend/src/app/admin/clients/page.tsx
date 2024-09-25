"use client";

// File: src/app/admin/clients/page.tsx

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../services/clientService';

const clientFieldConfig = [
  { label: 'First Name', key: 'user.first_name' },
  { label: 'Last Name', key: 'user.last_name' },
  { label: 'Email', key: 'user.email' },
  { label: 'Phone Number', key: 'user.phone_number' },
  { label: 'Training Status', key: 'training_status' },
  { label: 'Personal Training Rate', key: 'personal_training_rate', type: 'number' },
  { label: 'Rate Type', key: 'rate_type' },
  { label: 'Emergency Contact Name', key: 'emergency_contact_name' },
  { label: 'Emergency Contact Phone', key: 'emergency_contact_phone' },
];

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <BaseListDetailsPage
      data={selectedClient}  // Pass selected client to render its details
      fieldConfig={clientFieldConfig}  // Pass dynamic field configuration
      section="clients" // Indicate that this is for the clients section
      onSave={(updatedClient) => console.log('Client saved:', updatedClient)}
      renderList={() => (
        <ul>
          {clients.map((client) => (
            <li key={client.user.id} onClick={() => handleClientSelect(client)}>
              {client.user.first_name} {client.user.last_name}
            </li>
          ))}
        </ul>
      )}
    />
  );
};

export default ClientsPage;
