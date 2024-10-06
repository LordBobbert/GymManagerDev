// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { User } from "@/interfaces/user";
import { fetchUsers } from "@/services/userService";
import BaseList from "@/components/common/BaseList";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddClientForm from "@/components/admin/AddClientForm";
import { getClientFieldConfig } from "@/config/fieldConfigs";
import { createUser } from "@/services/userService";

const ClientsPage = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsersData = async () => {
      try {
        const fetchedUsers: User[] = await fetchUsers();

        // Adjusted filtering assuming roles is an array of strings
        const clients = fetchedUsers.filter((user) =>
          user.roles.includes("client")
        );

        const trainers = fetchedUsers.filter((user) =>
          user.roles.includes("trainer")
        );


        setClients(clients);
        setTrainers(trainers);
        setLoading(false);
      } catch (error) {
        setError("Failed to load clients and trainers");
        setLoading(false);
      }
    };

    loadUsersData();
  }, []);

  const handleClientSelect = (client: User) => {
    setSelectedClient(null);
    setTimeout(() => {
      setSelectedClient(client);
    }, 0);
  };

  const handleClientSave = async () => {
    try {
      if (selectedClient) {
        const updatedClients = [...clients];
        setClients(updatedClients);
        setSelectedClient(null);
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  // File: src/components/admin/AddClientForm.tsx

  // Ensure onSubmit does not expect 'id' and 'roles'
  const handleAddClientSubmit = async (newClient: Omit<User, "id" | "roles">): Promise<void> => {
    try {
      // Add roles explicitly in the onSubmit logic
      const clientToCreate = { ...newClient, roles: ["client"] };
      await createUser(clientToCreate); // Ensure your user creation method handles the object without 'id'
      setIsAddClientOpen(false); // Close the form on success
      const updatedClients = await fetchUsers(); // Reload clients
      setClients(updatedClients); // Update clients in state
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };


  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Clients</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddClientOpen(true)}
        >
          Add Client
        </Button>
      </Box>

      <BaseList<User>
        data={clients}
        section="clients"
        getKey={(client) => client.id}
        onSelect={handleClientSelect}
        renderItem={(client) => (
          <span>
            {client.first_name} {client.last_name}
          </span>
        )}
      />

      {selectedClient && (
        <Box sx={{ flex: 3 }}>
          <BaseListDetailsPage<User>
            key={selectedClient.id}
            data={selectedClient}
            fieldConfig={getClientFieldConfig()}
            onSave={handleClientSave}
            clients={clients}
            trainers={trainers}
            isEditing={true}
            handleChange={(key, value) => {
              setSelectedClient((prev) =>
                prev ? { ...prev, [key]: value } : null
              );
            }}
          />
        </Box>
      )}

      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        loading={loading}
        trainers={[]} // Pass an empty array or actual trainers if available
      />
    </Box>
  );
};

export default ClientsPage;
