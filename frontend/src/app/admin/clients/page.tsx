// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients, addClient, updateClient } from '../../../services/clientService';
import { getClientFieldConfig } from '../../../config/fieldConfigs';  // Import the correct function
import { Trainer } from '../../../interfaces/trainer';
import { fetchTrainers } from '../../../services/trainerService';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
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
    // Reset the selected client to force re-rendering
    setSelectedClient(null); 
    // Introduce a slight delay to simulate resetting before selecting new client
    setTimeout(() => {
      setSelectedClient(client);
    }, 0); 
  };

  const handleClientSave = async (updatedClient: Client) => {
    try {
      await updateClient(updatedClient.id, updatedClient);
      console.log('Client updated successfully');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };
  

  const handleAddClientSubmit = async (newClient: Omit<Client, 'id'>) => {
    try {
      await addClient(newClient); 
      console.log('Client added successfully');
      setIsAddClientOpen(false); 
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
        <BaseList<Client>
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          renderItem={(client: Client) => (
            <span>{client.user.first_name} {client.user.last_name}</span>
          )}
          onAddClient={() => setIsAddClientOpen(true)}
        />
      </div>

      {/* Right panel: BaseListDetailsPage */}
      {selectedClient && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedClient.id} // Use key to force re-render when client changes
            data={selectedClient}
            fieldConfig={getClientFieldConfig(trainers)}  // Call the function with trainers
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
        loading={loading}
      />
    </div>
  );
};

export default ClientsPage;
