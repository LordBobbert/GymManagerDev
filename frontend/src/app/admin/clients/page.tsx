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

const ClientsPage = () => {
  const [clients, setClients] = useState<User[]>([]); // Clients state
  const [trainers, setTrainers] = useState<User[]>([]); // Trainers state
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsersData = async () => {
      try {
        const fetchedUsers: User[] = await fetchUsers();
        
        // Filter clients and trainers by their roles
        const clients = fetchedUsers.filter((user) =>
          user.roles.includes("client") // roles as string array
        );
        const trainers = fetchedUsers.filter((user) =>
          user.roles.includes("trainer") // roles as string array
        );

        setClients(clients);
        setTrainers(trainers); // Set trainers state
        setLoading(false);
      } catch (error) {
        setError("Failed to load clients and trainers");
        setLoading(false);
      }
    };

    loadUsersData();
  }, []);

  const handleClientSelect = (client: User) => {
    setSelectedClient(null); // Deselect first
    setTimeout(() => {
      setSelectedClient(client); // Re-select the new client
    }, 0);
  };

  const handleClientSave = async (updatedClient: Partial<User>) => {
    try {
      if (selectedClient) {
        // Call update service and refresh client list
        const updatedClients = [...clients]; // Mock update for now
        setClients(updatedClients);
        setSelectedClient(null); // Reset selected client to refresh UI
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleAddClientSubmit = async (newClient: Omit<User, "id">) => {
    try {
      // Call create service and refresh client list
      const updatedClients = [...clients]; // Mock add for now
      setClients(updatedClients);
      setIsAddClientOpen(false);
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
            key={selectedClient.id} // Corrected to use selectedClient.id
            data={selectedClient}
            fieldConfig={getClientFieldConfig()} // Provide the correct fieldConfig
            onSave={handleClientSave}
            clients={clients} // Pass the list of clients
            trainers={trainers} // Pass the list of trainers
            isEditing={true} // Enable editing
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
        trainers={trainers} // Pass trainers to AddClientForm
        loading={loading}
      />
    </Box>
  );
};

export default ClientsPage;
