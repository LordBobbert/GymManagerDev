// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer'; // Import Trainer interface
import { fetchClients } from '../../../services/clientService';
import { clientFieldConfig } from '../../../config/fieldConfigs';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false); // State for modal
  const [trainers, setTrainers] = useState<Trainer[]>([]); // State for trainers
  const [loadingTrainers, setLoadingTrainers] = useState<boolean>(true); // Loading state for trainers
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
  }, []);

  // Fetch trainers for the dropdown in the form
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('/api/user-management/trainers/');
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error('Failed to load trainers:', error);
      } finally {
        setLoadingTrainers(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleClientSave = (updatedClient: Client) => {
    console.log('Client saved:', updatedClient);
  };

  const handleAddClientSubmit = async (newClient: Omit<Client, 'id'>) => {
    // Handle adding new client logic here
    console.log('New Client:', newClient);
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
        trainers={trainers}
        loading={loadingTrainers}
      />
    </div>
  );
};

export default ClientsPage;
