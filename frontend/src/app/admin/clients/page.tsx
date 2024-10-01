// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Box, Paper, Typography, IconButton, List, ListItemButton, ListItemText, Button, Grid, TextField } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import { fetchClients } from "@/services/clientService";
import { Client } from "@/interfaces/client";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    setIsEditing(false);  // Reset edit mode when selecting a new client
  };

  const handleSave = () => {
    // Logic to save the updated client details
    setIsEditing(false);  // Exit edit mode after saving
  };

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      <Box sx={{ width: "30%", mr: 3 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Clients List
          </Typography>
          <List>
            {clients.map((client) => (
              <ListItemButton
                key={client.id}
                onClick={() => handleClientSelect(client)}
                selected={selectedClient?.id === client.id}
              >
                <ListItemText
                  primary={client.user ? `${client.user.first_name} ${client.user.last_name}` : "Unknown User"}
                  secondary={client.user?.email || "No email available"}
                />
                <IconButton
                  edge="end"
                  aria-label="call"
                  onClick={() => client.user?.phone_number && alert(`Calling ${client.user.phone_number}`)}
                  disabled={!client.user?.phone_number}
                >
                  <PhoneIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="email"
                  onClick={() => client.user?.email && alert(`Emailing ${client.user.email}`)}
                  disabled={!client.user?.email}
                >
                  <EmailIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="text"
                  onClick={() => client.user?.phone_number && alert(`Texting ${client.user.phone_number}`)}
                  disabled={!client.user?.phone_number}
                >
                  <SmsIcon />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Box>

      {selectedClient && (
        <Box sx={{ width: "70%" }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isEditing ? "Edit Client Details" : "Client Details"}
            </Typography>

            {/* Render fields for editing or viewing */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={selectedClient.user?.first_name || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev ? { ...prev, user: { ...prev.user, first_name: e.target.value } } : prev
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={selectedClient?.user?.last_name || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev
                        ? {
                          ...prev,
                          user: {
                            ...prev.user,
                            last_name: e.target.value,  // Update the last name while preserving the rest of the user properties
                          },
                        }
                        : prev  // Keep the previous state if prev is null
                    )
                  }
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={selectedClient.user?.email || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev ? { ...prev, user: { ...prev.user, email: e.target.value } } : prev
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  value={selectedClient.user?.phone_number || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev ? { ...prev, user: { ...prev.user, phone_number: e.target.value } } : prev
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Training Status"
                  value={selectedClient?.training_status || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev
                        ? {
                          ...prev,
                          user: {
                            ...prev.user,
                            training_status: e.target.value,  // Update the last name while preserving the rest of the user properties
                          },
                        }
                        : prev  // Keep the previous state if prev is null
                    )
                  }
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Personal Training Rate"
                  value={selectedClient.personal_training_rate || ""}
                  fullWidth
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedClient((prev) =>
                      prev ? { ...prev, personal_training_rate: parseFloat(e.target.value) } : prev
                    )
                  }
                />
              </Grid>
            </Grid>

            {/* Edit and Save Buttons */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              {isEditing ? (
                <>
                  <Button variant="outlined" sx={{ mr: 2 }} onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
