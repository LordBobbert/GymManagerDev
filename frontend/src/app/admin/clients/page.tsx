// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import BaseList from "@/components/common/BaseList";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import { fetchClients, updateClient } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";
import { Client } from "@/interfaces/client";
import { Trainer } from "@/interfaces/trainer";
import { getClientFieldConfig } from "@/config/fieldConfigs";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTrainers, setLoadingTrainers] = useState<boolean>(true);

  // Fetch clients and trainers on component mount
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

    const loadTrainers = async () => {
      try {
        const fetchedTrainers = await fetchTrainers();
        setTrainers(fetchedTrainers);
      } catch (err) {
        console.error("Failed to fetch trainers.");
      }
      setLoadingTrainers(false);
    };

    loadClients();
    loadTrainers();
  }, []);

  // Handle save for updating a client
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

  // Loading state
  if (loading || loadingTrainers) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Render ClientsPage
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* BaseList: Shows the list of clients */}
      <BaseList<Client>
        data={clients}
        section="clients"
        onSelect={setSelectedClient}
        getKey={(client) => client.id}
        renderItem={(client) => (
          <>
            {client.user.first_name} {client.user.last_name}
            <br />
            {client.user.email}
          </>
        )}
      />

      {/* BaseListDetailsPage: Shows the details of the selected client */}
      {selectedClient && (
        <BaseListDetailsPage<Client>
          data={selectedClient}
          fieldConfig={getClientFieldConfig(trainers)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default ClientsPage;
