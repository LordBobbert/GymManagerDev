// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients, addClient } from '../../../services/clientService';
import { clientFieldConfig } from '../../../config/fieldConfigs';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);

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

  const handleAddClientSubmit = (newClient: Omit<Client, 'id'>) => {
    // Call backend service to add client
    addClient(newClient).then(() => {
      // Refresh client list after adding
      fetchClients().then((data) => setClients(data));
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Left panel: BaseList */}
      <div style={{ flex: 1 }}>
        <BaseList
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          renderItem={(client) => (
            <span>{client.user.first_name} {client.user.last_name}</span>
          )}
          onAddClient={() => setIsAddClientOpen(true)} // Pass the add client handler
        />
      </div>

      {/* Right panel: BaseListDetailsPage */}
      {selectedClient && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            data={selectedClient}
            fieldConfig={clientFieldConfig}
            onSave={handleClientSave}
          />
        </div>
      )}

      {/* Add Client Form Modal */}
      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
      />
    </div>
  );
};

export default ClientsPage;
