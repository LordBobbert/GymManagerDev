// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Box, Paper, Typography, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import { fetchClients } from "@/services/clientService";
import { Client } from "@/interfaces/client";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

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
                {/* Safely check if user exists before accessing properties */}
                <ListItemText
                  primary={client.user ? `${client.user.first_name} ${client.user.last_name}` : "Unknown User"}
                  secondary={client.user?.email || "No email available"}
                />
                {/* Phone Icon */}
                <IconButton
                  edge="end"
                  aria-label="call"
                  onClick={() => client.user?.phone_number && alert(`Calling ${client.user.phone_number}`)}
                  disabled={!client.user?.phone_number} // Disable button if phone number is not available
                >
                  <PhoneIcon />
                </IconButton>
                {/* Email Icon */}
                <IconButton
                  edge="end"
                  aria-label="email"
                  onClick={() => client.user?.email && alert(`Emailing ${client.user.email}`)}
                  disabled={!client.user?.email} // Disable button if email is not available
                >
                  <EmailIcon />
                </IconButton>
                {/* Text Icon */}
                <IconButton
                  edge="end"
                  aria-label="text"
                  onClick={() => client.user?.phone_number && alert(`Texting ${client.user.phone_number}`)}
                  disabled={!client.user?.phone_number} // Disable button if phone number is not available
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
              Client Details
            </Typography>

            {/* Safely check if user exists before accessing properties */}
            {selectedClient.user ? (
              <>
                <Typography variant="body1" gutterBottom>
                  Name: {selectedClient.user.first_name} {selectedClient.user.last_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Email: {selectedClient.user.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Phone: {selectedClient.user.phone_number ?? 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Gender: {selectedClient.user.gender ?? 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Birthday: {selectedClient.user.birthday ?? 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Roles: {selectedClient.user.roles.map(role => role.name).join(', ')}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="error">
                User data is not available
              </Typography>
            )}

            {/* Client Specific Details */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Client Info
            </Typography>
            <Typography variant="body1" gutterBottom>
              Training Status: {selectedClient.training_status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rate Type: {selectedClient.rate_type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Personal Training Rate: {selectedClient.personal_training_rate ? `$${selectedClient.personal_training_rate}` : 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Trainer: {selectedClient.trainer && selectedClient.trainer.user ? `${selectedClient.trainer.user.first_name} ${selectedClient.trainer.user.last_name}` : 'No Trainer Assigned'}
            </Typography>

            {/* Emergency Contact Details */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Emergency Contact
            </Typography>
            <Typography variant="body1" gutterBottom>
              Name: {selectedClient.emergency_contact_name ?? 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {selectedClient.emergency_contact_phone ?? 'N/A'}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
