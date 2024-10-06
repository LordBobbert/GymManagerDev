// File: src/app/clients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { User } from "@/interfaces/user";
import { fetchUsers } from "@/services/userService";
import { createUser, updateUser } from "@/services/userService"; 
import BaseList from "@/components/common/BaseList";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddClientForm from "@/components/admin/AddClientForm";
import { getClientFieldConfig } from "@/config/fieldConfigs";

const ClientsPage = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]); // Trainers state
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddClientOpen, setIsAddClientOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsersData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        const clients = fetchedUsers.filter((user) => user.roles.includes("client"));
        const trainers = fetchedUsers.filter((user) => user.roles.includes("trainer"));
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
    setSelectedClient(null); // Deselect first
    setTimeout(() => {
      setSelectedClient(client); // Re-select the new client
    }, 0);
  };

  const handleClientSave = async (updatedClient: Partial<User>) => {
    try {
      if (selectedClient) {
        await updateUser(selectedClient.id, updatedClient);
        const fetchedUsers = await fetchUsers();
        const updatedClients = fetchedUsers.filter((user) => user.roles.includes("client"));
        setClients(updatedClients);
        setSelectedClient(null); // Reset selected client to refresh UI
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleAddClientSubmit = async (newClient: Omit<User, "id">) => {
    try {
      await createUser(newClient);
      setIsAddClientOpen(false);
      const fetchedUsers = await fetchUsers();
      const updatedClients = fetchedUsers.filter((user) => user.roles.includes("client"));
      setClients(updatedClients);
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
    <Box sx={{ display: "flex", gap: 2, height: "100%" }}>
      {/* BaseList takes 25% of the width */}
      <Box sx={{ flex: 1, width: "25%" }}>
        <BaseList<User>
          data={clients}
          section="clients"
          getKey={(client) => client.id}
          onSelect={handleClientSelect}
          renderItem={(client) => (
            <span>{client.first_name} {client.last_name}</span>
          )}
        />
      </Box>

      {/* BaseListDetailsPage takes 75% of the width */}
      {selectedClient && (
        <Box sx={{ flex: 3, width: "75%" }}>
          <BaseListDetailsPage<User>
            key={selectedClient.id}
            data={selectedClient}
            fieldConfig={getClientFieldConfig()}  // Provide the correct fieldConfig
            onSave={handleClientSave}
            clients={clients}  // Pass the list of clients
            trainers={trainers}  // Pass the list of trainers
            isEditing={true}  // Enable editing
            handleChange={(key, value) => {
              setSelectedClient((prev) => prev ? { ...prev, [key]: value } : null);
            }}
          />
        </Box>
      )}

      <AddClientForm
        open={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClientSubmit}
        trainers={trainers}  // Pass trainers to AddClientForm
        loading={loading}
      />
    </Box>
  );
};

export default ClientsPage;
