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
  TextField,
  Button,
} from "@mui/material";
import { fetchClients } from "@/services/clientService";
import { Client } from "@/interfaces/client";
import { Session } from "@/interfaces/session";
import { fetchClientSessions } from "@/services/clientService";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (err) {
        console.error("Failed to fetch clients.");
        setError("Failed to fetch clients."); // Optional error state handling
      }
    };
    loadClients();
  }, []);

  const handleClientSelect = async (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false); // Start in view-only mode
    try {
      const fetchedSessions = await fetchClientSessions(client.id);
      setSessions(fetchedSessions);
    } catch (err) {
      console.error("Failed to fetch sessions.");
      setError("Failed to fetch sessions."); // Optional error state handling
    }
  };

  const handleSave = async () => {
    if (selectedClient) {
      // Implement save logic here (not specified in the request)
      setIsEditing(false); // Go back to view-only mode
    }
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

      {/* Client Details and Sessions */}
      {selectedClient && (
        <Box sx={{ flex: 2 }}>
          <Paper sx={{ padding: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isEditing ? "Edit Client Details" : "Client Details"}
            </Typography>

            <TextField
              label="First Name"
              value={selectedClient.user.first_name}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedClient((prev) => ({
                  ...prev!,
                  user: { ...prev!.user, first_name: e.target.value },
                }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Last Name"
              value={selectedClient.user.last_name}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedClient((prev) => ({
                  ...prev!,
                  user: { ...prev!.user, last_name: e.target.value },
                }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              value={selectedClient.user.email}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedClient((prev) => ({
                  ...prev!,
                  user: { ...prev!.user, email: e.target.value },
                }))
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Phone Number"
              value={selectedClient.user.phone_number}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedClient((prev) => ({
                  ...prev!,
                  user: { ...prev!.user, phone_number: e.target.value },
                }))
              }
              sx={{ mb: 2 }}
            />

            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                color="secondary"
              >
                Edit
              </Button>
            )}
          </Paper>

          {/* Sessions associated with this client */}
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sessions
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Session Type</TableCell>
                    <TableCell>Trainer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.session_type}</TableCell>
                      <TableCell>
                        {session.trainer && "user" in session.trainer ? (
                          `${session.trainer.user.first_name} ${session.trainer.user.last_name}`
                        ) : (
                          "Trainer Not Assigned"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ClientsPage;
