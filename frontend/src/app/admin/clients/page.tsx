// File: src/app/admin/clients/page.tsx

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
      <TableContainer component={Paper} sx={{ flex: 1, mr: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                onClick={() => handleClientSelect(client)}
                hover
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  {client.user.first_name} {client.user.last_name}
                </TableCell>
                <TableCell>{client.user.email}</TableCell>
                <TableCell>{client.user.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedClient && (
        <Box sx={{ flex: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Client Details
            </Typography>
            <Typography variant="body1">
              {selectedClient.user.first_name} {selectedClient.user.last_name}
            </Typography>
            <Typography variant="body1">{selectedClient.user.email}</Typography>
            <Typography variant="body1">
              {selectedClient.user.phone_number}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
