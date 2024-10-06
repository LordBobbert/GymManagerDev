// File: src/app/admin/clients/page.tsx

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BaseList from '@/components/common/BaseList';
import AddClientForm from '@/components/admin/AddClientForm';
import { User } from '@/interfaces/user';
import { fetchUsers, createUser } from '@/services/userService';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadClientsData = async () => {
    const fetchedUsers = await fetchUsers();
    const clientUsers = fetchedUsers.filter(user => user.roles.includes('client'));
    setClients(clientUsers);
  };

  useEffect(() => {
    loadClientsData();
  }, []);

  const handleAddClientSubmit = async (newClient: Omit<User, 'id' | 'roles'>) => {
    setLoading(true);
    await createUser({ ...newClient, roles: ['client'] });
    setLoading(false);
    setIsAddClientOpen(false);
    loadClientsData(); // Reload clients after adding a new one
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', px: 2 }}>
      {/* Only BaseList will handle rendering the "Add Client" button */}
      <BaseList
        data={clients}
        section="clients"
        getKey={(client) => client.id}
        onSelect={setSelectedClient}
        renderItem={(client) => (
          <span>{client.first_name} {client.last_name}</span>
        )}
        onAddItem={() => setIsAddClientOpen(true)} // Trigger the modal from BaseList
      />

      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        trainers={[]} // Pass an empty array or actual trainers if available
        loading={loading}
      />
    </Box>
  );
};

export default ClientsPage;
