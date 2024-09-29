"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Session } from "@/interfaces/session";
import { fetchSessions } from "@/services/sessionService";
import { Client } from "@/interfaces/client";
import { Trainer } from "@/interfaces/trainer";
import { fetchClients } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const [sessionsData, clientsData, trainersData] = await Promise.all([
          fetchSessions(),
          fetchClients(),
          fetchTrainers(),
        ]);
        setSessions(sessionsData);
        setClients(clientsData);
        setTrainers(trainersData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load sessions, clients, or trainers");
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsEditing(false); // Ensure the form is in view-only mode initially
  };

  const handleEditClick = () => {
    setIsEditing(true); // Switch to editing mode when the Edit button is clicked
  };

  const handleSaveClick = async () => {
    // Handle save logic here, such as updating the session
    setIsEditing(false); // Return to view-only mode after saving
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Return to view-only mode if cancel is clicked
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      {/* Session List - 25% width */}
      <Box sx={{ flex: 1 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Session Type</TableCell>
                <TableCell>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow
                  key={session.id}
                  onClick={() => handleSessionSelect(session)}
                  hover
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.session_type}</TableCell>
                  <TableCell>
                    {session.client?.user?.first_name
                      ? `${session.client.user.first_name} ${session.client.user.last_name}`
                      : "No Client"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Session Details - 75% width */}
      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {isEditing ? "Edit Session Details" : "Session Details"}
              </Typography>

              <TextField
                label="Date"
                value={selectedSession.date}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Session Type"
                value={selectedSession.session_type}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Client"
                value={
                  selectedSession.client?.user?.first_name
                    ? `${selectedSession.client.user.first_name} ${selectedSession.client.user.last_name}`
                    : "No Client"
                }
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Trainer"
                value={
                  selectedSession.trainer?.user?.first_name
                    ? `${selectedSession.trainer.user.first_name} ${selectedSession.trainer.user.last_name}`
                    : "No Trainer"
                }
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Notes"
                value={selectedSession.notes || ""}
                fullWidth
                multiline
                rows={4}
                disabled={!isEditing}
              />

              {isEditing ? (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button variant="contained" onClick={handleSaveClick}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button variant="contained" onClick={handleEditClick}>
                    Edit
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
