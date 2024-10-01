// File: src/app/admin/sessions/page.tsx

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
import { fetchSessions, updateSession } from "@/services/sessionService";
import { fetchTrainers } from "@/services/trainerService";
import { Session } from "@/interfaces/session";
import { Trainer } from "@/interfaces/trainer";

// Type guard to check if the trainer has the `user` property
const isFullTrainer = (trainer: Trainer | { id: number }): trainer is Trainer => {
  return (trainer as Trainer).user !== undefined;
};

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const fetchedSessions = await fetchSessions();
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    const loadTrainers = async () => {
      try {
        const fetchedTrainers = await fetchTrainers();
        setTrainers(fetchedTrainers);
      } catch (error) {
        console.error("Failed to fetch trainers:", error);
      }
    };

    loadSessions();
    loadTrainers();
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsEditing(false);
    setSelectedTrainerId(session.trainer?.id || null);
  };

  const handleSave = async () => {
    if (selectedSession) {
      try {
        const updatedSession = {
          trainer: selectedTrainerId ? { id: selectedTrainerId } : selectedSession.trainer,
          id: selectedSession.id,
          client: selectedSession.client,
          session_type: selectedSession.session_type,
          date: selectedSession.date,
          notes: selectedSession.notes,
        };
        await updateSession(selectedSession.id, updatedSession);
        setIsEditing(false);
      } catch (err) {
        console.error("Failed to update session:", err);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", padding: 2 }}>
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
                  {session.client?.user?.first_name ?? "No Client"}
                </TableCell>
                <TableCell>
                  {session.trainer && isFullTrainer(session.trainer) ? (
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

      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {isEditing ? "Edit Session Details" : "Session Details"}
            </Typography>

            <TextField
              label="Session Type"
              value={selectedSession.session_type}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedSession((prev) =>
                  prev ? { ...prev, session_type: e.target.value } : prev
                )
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Date"
              type="datetime-local"
              value={selectedSession.date}
              fullWidth
              disabled={!isEditing}
              onChange={(e) =>
                setSelectedSession((prev) =>
                  prev ? { ...prev, date: e.target.value } : prev
                )
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Trainer"
              select
              fullWidth
              SelectProps={{ native: true }}
              value={selectedTrainerId || ""}
              onChange={(e) => setSelectedTrainerId(Number(e.target.value))}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            >
              <option value="">Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.user?.first_name} {trainer.user?.last_name}
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
