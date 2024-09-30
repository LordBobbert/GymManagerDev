"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSessions, updateSession } from "@/services/sessionService";
import { fetchClients } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";
import { Session } from "@/interfaces/session";
import { Client } from "@/interfaces/client";
import { Trainer } from "@/interfaces/trainer";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data when the component loads
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedSessions, fetchedClients, fetchedTrainers] =
          await Promise.all([fetchSessions(), fetchClients(), fetchTrainers()]);
        setSessions(fetchedSessions);
        setClients(fetchedClients);
        setTrainers(fetchedTrainers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsEditing(false); // Initially in view-only mode
    setSelectedTrainerId(session.trainer?.id || null); // Set trainer ID
  };

  const handleSave = async () => {
    if (selectedSession) {
      try {
        const updatedSession = {
          ...selectedSession,
          trainer: selectedTrainerId
            ? { id: selectedTrainerId }
            : selectedSession.trainer, // Preserve the existing trainer if unchanged
        };
        await updateSession(selectedSession.id, updatedSession);
        setIsEditing(false); // Switch back to view-only mode after saving
      } catch (err) {
        setError("Failed to update session");
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
      {/* Sessions List Table */}
      <TableContainer component={Paper} sx={{ flex: 1, mr: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Session Type</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Trainer</TableCell>
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
                  {session.client?.user.first_name}{" "}
                  {session.client?.user.last_name}
                </TableCell>
                <TableCell>
                  {/* Check if trainer exists and has a user before accessing */}
                  {session.trainer && "user" in session.trainer ? (
                    <>
                      {session.trainer.user.first_name}{" "}
                      {session.trainer.user.last_name}
                    </>
                  ) : (
                    "Trainer Not Assigned"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Session Details */}
      {selectedSession && (
        <Box sx={{ flex: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isEditing ? "Edit Session Details" : "Session Details"}
            </Typography>

            {/* Session Type */}
            <TextField
              label="Session Type"
              value={selectedSession.session_type}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedSession((prev) => ({
                  ...prev!,
                  session_type: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />

            {/* Date */}
            <TextField
              label="Date"
              type="datetime-local"
              value={selectedSession.date}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedSession((prev) => ({
                  ...prev!,
                  date: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />

            {/* Trainer */}
            <TextField
              label="Trainer"
              select
              fullWidth
              SelectProps={{
                native: true,
              }}
              value={selectedTrainerId || ""}
              onChange={(e) => setSelectedTrainerId(Number(e.target.value))}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            >
              <option value="">Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.user.first_name} {trainer.user.last_name}
                </option>
              ))}
            </TextField>

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
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
