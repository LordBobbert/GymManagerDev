// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer'; // Import Trainer type
import { fetchClients } from '../../../services/clientService';
import { fetchTrainers } from '../../../services/trainerService'; // Assuming you have a service to fetch trainers
import { clientFieldConfig } from '../../../config/fieldConfigs';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [trainers, setTrainers] = useState<Trainer[] | null>(null); // State to store trainers
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to show loading spinner

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both clients and trainers concurrently
        const [clientsData, trainersData] = await Promise.all([
          fetchClients(),
          fetchTrainers(),
        ]);
        setClients(clientsData);
        setTrainers(trainersData);
      } catch (error) {
        setError('Failed to load clients or trainers.');
      } finally {
        setLoading(false); // Stop loading spinner once fetching is done
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

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  if (!clients || !trainers) {
    return <div>No data available</div>;
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
            onSave={(updatedClient: Client) => console.log('Updated Client:', updatedClient)}
          />
        </div>
      )}

      {/* Add Client Form Modal */}
      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        trainers={trainers} // Pass the fetched trainers to the AddClientForm
        loading={loading} // Pass the loading state to the AddClientForm (if needed)
      />
    </div>
  );
};

export default ClientsPage;
