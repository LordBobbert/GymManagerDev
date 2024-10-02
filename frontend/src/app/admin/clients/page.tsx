// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import { fetchClients, updateClient } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";  // Assuming there's a service to fetch trainers
import { Client } from "@/interfaces/client";
import { Trainer } from "@/interfaces/trainer";
import { getClientFieldConfig } from "@/config/fieldConfigs";  // Import the client field config

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);  // State for trainers
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTrainers, setLoadingTrainers] = useState<boolean>(true); // Trainer loading state

  // Fetch clients when the component is mounted
  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (err) {
        console.error("Failed to fetch clients.");
      }
      setLoading(false);
    };

    loadClients();
  }, []);

  // Fetch trainers when the component is mounted
  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const fetchedTrainers = await fetchTrainers();
        setTrainers(fetchedTrainers);
      } catch (err) {
        console.error("Failed to fetch trainers.");
      }
      setLoadingTrainers(false);
    };

    loadTrainers();
  }, []);

  const handleSave = async (updatedClient: Partial<Client>) => {
    if (selectedClient) {
      try {
        await updateClient(selectedClient.id, updatedClient);
        // Update the client list with the saved client
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === selectedClient.id ? { ...client, ...updatedClient } : client
          )
        );
        setSelectedClient((prev) => (prev ? { ...prev, ...updatedClient } : prev));
      } catch (err) {
        console.error("Failed to save client.");
      }
    }
  };

  if (loading || loadingTrainers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BaseListDetailsPage<Client>
      data={selectedClient || clients[0]}  // Initialize with the first client as a fallback
      fieldConfig={getClientFieldConfig(trainers)}  // Pass trainers to the config
      onSave={handleSave}
    />
  );
};

export default ClientsPage;
