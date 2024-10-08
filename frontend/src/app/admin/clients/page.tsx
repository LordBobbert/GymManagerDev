// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BaseList from "@/components/common/BaseList";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddClientForm from "@/components/admin/AddClientForm";
import { User } from "@/interfaces/user";
import { getClientFieldConfig } from "@/config/fieldConfigs"; // Import the field config
import { fetchUsers, createUser } from "@/services/userService";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  // Load clients data
  const loadClientsData = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      const clientUsers = fetchedUsers.filter(user => user.roles.includes('client'));
      setClients(clientUsers);
    } catch (error) {
      console.error("Error loading clients:", error);
    }
  };

  useEffect(() => {
    loadClientsData();
  }, []);

  // Handle changes to client details
  const handleClientChange = (key: keyof User, value: User[keyof User]) => {
    if (selectedClient) {
      setSelectedClient({ ...selectedClient, [key]: value });
    }
  };

  // Handle saving updated client details
  const handleClientSave = (updatedClient: User) => {
    setClients((prev) =>
      prev.map((client) => (client.id === updatedClient.id ? updatedClient : client))
    );
    setSelectedClient(updatedClient);
  };

  // Handle submission of new client data
  const handleAddClientSubmit = async (newClient: Omit<User, 'id' | 'roles'>) => {
    setLoading(true);
    try {
      await createUser({ ...newClient, roles: ['client'] }); // Automatically assign the 'client' role
      setIsAddClientOpen(false);
      loadClientsData(); // Reload clients after adding a new one
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
      <Box sx={{ flex: 1, width: "25%" }}>
        <BaseList<User>
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={setSelectedClient}
          renderItem={(client) => (
            <span>
              {client.first_name} {client.last_name}
            </span>
          )}
          onAddItem={() => setIsAddClientOpen(true)}
        />
      </Box>

      {selectedClient && (
        <Box sx={{ flex: 3, width: "75%" }}>
          <BaseListDetailsPage<User>
            data={selectedClient}
            fieldConfig={getClientFieldConfig()} // Use the defined client field config
            onSave={handleClientSave}
            clients={clients}
            trainers={[]} // Pass trainers if needed
            isEditing={true}
            handleChange={handleClientChange}
          />
        </Box>
      )}

      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        loading={loading}
        trainers={[]} // Trainers can be passed if needed
      />
    </Box>
  );
};

export default ClientsPage;
