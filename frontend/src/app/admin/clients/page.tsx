// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer'; 
import { fetchClients } from '../../../services/clientService';
import { fetchTrainers } from '../../../services/trainerService'; 
import { clientFieldConfig } from '../../../config/fieldConfigs';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [trainers, setTrainers] = useState<Trainer[] | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientsData, trainersData] = await Promise.all([
          fetchClients(),
          fetchTrainers(),
        ]);
        setClients(clientsData);
        setTrainers(trainersData);
      } catch (error) {
        setError('Failed to load clients or trainers.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  const handleAddClientSubmit = (newClient: Omit<Client, 'id'>) => {
    console.log('Adding client:', newClient);
    setIsAddClientOpen(false); // Close the modal after adding
  };

  const handleOpenAddClient = () => {
    setIsAddClientOpen(true); // Open modal
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Left panel: BaseList */}
      <div style={{ flex: 1 }}>
        <BaseList
          data={clients || []}  // Ensure we pass an empty array if clients is null
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          onAddClient={handleOpenAddClient} // Pass handler to open AddClientForm
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
            onSave={(updatedClient: Client) => console.log('Updated Client:', updatedClient)}
          />
        </div>
      )}

      {/* Add Client Form Modal */}
      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        trainers={trainers || []} // Ensure trainers is passed, even if empty
        loading={loading} // Loading state
      />
    </div>
  );
};

export default ClientsPage;
