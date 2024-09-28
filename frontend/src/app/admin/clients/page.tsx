// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddClientForm from '../../../components/admin/AddClientForm';
import { Client } from '../../../interfaces/client';
import { fetchClients, addClient, updateClient } from '../../../services/clientService';
import { getClientFieldConfig } from '../../../config/fieldConfigs';
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
    setSelectedClient(null); 
    setTimeout(() => {
      setSelectedClient(client);
    }, 0); 
  };

  const handleClientSave = async (updatedFields: Partial<Client>) => {
    try {
      if (selectedClient) {
        const response = await updateClient(selectedClient.id, updatedFields);
        console.log('Client updated successfully', response);
        const updatedClients = await fetchClients();
        setClients(updatedClients);
        setSelectedClient(null);
      }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Client Info */}
              <Box>
                <Typography variant="h6">
                  {client.user.first_name} {client.user.last_name}
                </Typography>
                <Typography variant="body2">{client.user.email}</Typography>
                <Typography variant="body2">{client.user.phone_number}</Typography>
              </Box>

              {/* Action Icons */}
              <Box>
                <IconButton aria-label="call" onClick={() => window.open(`tel:${client.user.phone_number}`)}>
                  <PhoneIcon />
                </IconButton>
                <IconButton aria-label="email" onClick={() => window.open(`mailto:${client.user.email}`)}>
                  <EmailIcon />
                </IconButton>
                <IconButton aria-label="text" onClick={() => window.open(`sms:${client.user.phone_number}`)}>
                  <ChatIcon />
                </IconButton>
              </Box>
            </Box>
          )}
          onAddClient={() => setIsAddClientOpen(true)}
        />
      </div>

      {/* Right panel: BaseListDetailsPage */}
      {selectedClient && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedClient.id}
            data={selectedClient}
            fieldConfig={getClientFieldConfig(trainers)}
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
