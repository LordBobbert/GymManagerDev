// File: src/app/admin/clients/page.tsx

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BaseList from '@/components/common/BaseList';
import AddClientForm from '@/components/admin/AddClientForm';
import { User } from '@/interfaces/user';
import { fetchUsers, createUser } from '@/services/userService';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]); // State to store trainers
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadClientsData = async () => {
    const fetchedUsers = await fetchUsers();
    const clientUsers = fetchedUsers.filter(user => user.roles.includes('client'));
    setClients(clientUsers);
  };

  const loadTrainersData = async () => {
    const fetchedUsers = await fetchUsers();
    const trainerUsers = fetchedUsers.filter(user => user.roles.includes('trainer'));
    setTrainers(trainerUsers);
  };

  useEffect(() => {
    loadClientsData();
    loadTrainersData(); // Fetch trainers when the component loads
  }, []);

  const handleAddClientSubmit = async (newClient: Omit<User, 'id' | 'roles'>) => {
    setLoading(true);
    await createUser({ ...newClient, roles: ['client'] }); // Automatically assign the role of "client"
    setLoading(false);
    setIsAddClientOpen(false);
    loadClientsData(); // Reload clients after adding a new one
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', px: 2 }}>
      <BaseList
        data={clients}
        section="clients"
        getKey={(client) => client.id}
        onSelect={() => {}} // Selection not needed currently
        renderItem={(client) => (
          <span>{client.first_name} {client.last_name}</span>
        )}
        onAddItem={() => setIsAddClientOpen(true)} // Open the Add Client form
      />

      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        loading={loading}
        trainers={trainers} // Pass the list of trainers to the form
      />
    </Box>
  );
};

export default ClientsPage;
