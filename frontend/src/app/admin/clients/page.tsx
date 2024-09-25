// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients, addClient } from '../../../services/clientService';
import { clientFieldConfig } from '../../../config/fieldConfigs';
import { Trainer } from '../../../interfaces/trainer';
import { fetchTrainers } from '../../../services/trainerService';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null); // Correct type for `clients`
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);  // Modal state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients()
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
    
    fetchTrainers()
      .then((data) => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load trainers.');
        setLoading(false);
      });
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleClientSave = (updatedClient: Client) => {
    console.log('Client saved:', updatedClient);
  };

  const handleAddClientSubmit = async (newClient: Omit<Client, 'id'>) => {
    try {
      await addClient(newClient);  // Ensure client is added to the database
      console.log('Client added successfully');
      setIsAddClientOpen(false);  // Close modal upon success
      // Fetch updated clients list
      const updatedClients = await fetchClients();
      setClients(updatedClients);
    } catch (error) {
      console.error('Error adding client:', error);
    }
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
        <BaseList<Client>  // Specify Client as the generic type
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          renderItem={(client: Client) => (  // Explicitly type client as Client
            <span>{client.user.first_name} {client.user.last_name}</span>
          )}
          onAddClient={() => setIsAddClientOpen(true)}  // Open modal
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
        onClose={() => setIsAddClientOpen(false)}  // Close modal
        onSubmit={handleAddClientSubmit}  // Submit form data
        trainers={trainers}  // Pass trainers data to the form
        loading={loading}  // Pass loading state for trainers
      />
    </div>
  );
};

export default ClientsPage;
