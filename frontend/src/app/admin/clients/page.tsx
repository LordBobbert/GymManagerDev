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
                <ListItemText
                  primary={`${client.user.first_name} ${client.user.last_name}`}
                  secondary={client.user.email}
                />
                {/* Phone Icon */}
                <IconButton edge="end" aria-label="call" onClick={() => alert(`Calling ${client.user.phone_number}`)}>
                  <PhoneIcon />
                </IconButton>
                {/* Email Icon */}
                <IconButton edge="end" aria-label="email" onClick={() => alert(`Emailing ${client.user.email}`)}>
                  <EmailIcon />
                </IconButton>
                {/* Text Icon */}
                <IconButton edge="end" aria-label="text" onClick={() => alert(`Texting ${client.user.phone_number}`)}>
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

            {/* User Details */}
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
              Trainer: {selectedClient.trainer ? `${selectedClient.trainer.user.first_name} ${selectedClient.trainer.user.last_name}` : 'No Trainer Assigned'}
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
