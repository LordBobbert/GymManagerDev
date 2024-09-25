"use client";

// File: src/app/admin/clients/page.tsx

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../services/clientService';
import { FieldConfig } from '../../../interfaces/FieldConfig';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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

  const clientFieldConfig: FieldConfig<Client>[] = [
    { label: 'First Name', key: 'user.first_name', type: 'text' },
    { label: 'Last Name', key: 'user.last_name', type: 'text' },
    { label: 'Email', key: 'user.email', type: 'email' },
    { label: 'Phone Number', key: 'user.phone_number', type: 'text' },
    { label: 'Training Status', key: 'training_status', type: 'text' },
    { label: 'Personal Training Rate', key: 'personal_training_rate', type: 'number' },
    { label: 'Rate Type', key: 'rate_type', type: 'text' },
    { label: 'Emergency Contact Name', key: 'emergency_contact_name', type: 'text' },
    { label: 'Emergency Contact Phone', key: 'emergency_contact_phone', type: 'text' },
  ];

  return (
    <BaseListDetailsPage
      data={clients}
      fieldConfig={clientFieldConfig} // Dynamic form generation based on field config
      section="clients"
      onSave={(updatedClient) => {
        console.log('Client saved:', updatedClient);
        // You can implement your save logic here (e.g., API call)
      }}
      renderList={() => (
        <ul>
          {clients.map((client) => (
            <li key={client.user.id} onClick={() => setSelectedClient(client)}>
              {client.user.first_name} {client.user.last_name}
            </li>
          ))}
        </ul>
      )}
    />
  );
};

export default ClientsPage;
