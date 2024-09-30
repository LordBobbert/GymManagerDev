// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { fetchClients } from "@/services/clientService";
import { Client } from "@/interfaces/client";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (err) {
        console.error("Failed to fetch clients.");
      }
    };
    loadClients();
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false);
  };

  const handleSave = async () => {
    // Add save logic for updating client details
    setIsEditing(false);
  };

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <Box sx={{ width: "30%", mr: 3 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Clients List
          </Typography>
          <ul>
            {clients.map((client) => (
              <li
                key={client.id}
                onClick={() => handleClientSelect(client)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  fontWeight:
                    selectedClient?.id === client.id ? "bold" : "normal",
                }}
              >
                {client.user.first_name} {client.user.last_name}
              </li>
            ))}
          </ul>
        </Paper>
      </Box>

      {selectedClient && (
        <Box sx={{ width: "70%" }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isEditing ? "Edit Client Details" : "Client Details"}
            </Typography>

            <TextField
              label="First Name"
              value={selectedClient.user.first_name}
              fullWidth
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Last Name"
              value={selectedClient.user.last_name}
              fullWidth
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              value={selectedClient.user.email}
              fullWidth
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Phone Number"
              value={selectedClient.user.phone_number}
              fullWidth
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />

            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsEditing(true)}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
