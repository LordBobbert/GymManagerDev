// File: src/app/clients/page.tsx

"use client";

import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchClients, updateClient } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";
import { ClientProfile } from "@/interfaces/client";
import { TrainerProfile } from "@/interfaces/trainer";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import { getClientFieldConfig } from "@/config/fieldConfigs";

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);

  useEffect(() => {
    const loadClientsData = async () => {
      try {
        const [fetchedClients, fetchedTrainers] = await Promise.all([
          fetchClients(),
          fetchTrainers(),
        ]);

        setClients(fetchedClients);
        setTrainers(fetchedTrainers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    loadClientsData();
  }, []);

  const handleClientSelect = (client: ClientProfile) => {
    setSelectedClient(null);  // Clear any existing selection
    setTimeout(() => {
      setSelectedClient(client);  // Set the clicked client
    }, 0);
  };

  const handleClientSave = async (updatedFields: Partial<ClientProfile>) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.user.id, updatedFields);  // Update the client using the user ID
        const updatedClients = await fetchClients();  // Refresh the clients list
        setClients(updatedClients);
        setSelectedClient(null);  // Clear selected client after save
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

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
        <Button variant="contained" color="primary">
          Add Client
        </Button>
      </Box>

      {/* Grid of clients */}
      <Grid container spacing={2}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.user.id}>
            <Card onClick={() => handleClientSelect(client)}>
              <CardContent>
                <Typography variant="h6">
                  {client.user.first_name} {client.user.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {client.user.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Client Details Section */}
      {selectedClient && (
        <Box sx={{ marginTop: 2 }}>
          <BaseListDetailsPage
            key={selectedClient.user.id}
            data={selectedClient}
            fieldConfig={getClientFieldConfig(trainers.map(trainer => trainer.user))}  // Map trainers to User[]
            onSave={handleClientSave}
            clients={clients}
            trainers={trainers}  // Keep passing TrainerProfile[] to other parts that need it
            isEditing={true}  // Enable editing for selected client
            handleChange={(key, value) => {
              const updatedClient = { ...selectedClient, [key]: value };
              setSelectedClient(updatedClient);
            }}
          />

        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
