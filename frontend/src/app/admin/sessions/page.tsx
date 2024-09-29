// File: src/app/admin/sessions/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { fetchSessions, updateSession } from "@/services/sessionService";
import { fetchClients } from "@/services/clientService";
import { fetchTrainers } from "@/services/trainerService";
import { Session } from "@/interfaces/session";
import { Trainer } from "@/interfaces/trainer";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sessionsData, trainersData] = await Promise.all([fetchSessions(), fetchTrainers()]);
        setSessions(sessionsData);
        setTrainers(trainersData);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    loadData();
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setSelectedTrainerId(session.trainer?.id || null);  // Initialize selectedTrainerId with the current session trainer
  };

  const handleSaveClick = async () => {
    if (selectedSession && selectedTrainerId !== null) {
      try {
        const updatedSession: Partial<Session> = {
          trainer: { id: selectedTrainerId } as Trainer,  // Ensure the trainer ID is correctly passed
          id: selectedSession.id,
          client: selectedSession.client,
          session_type: selectedSession.session_type,
          date: selectedSession.date,
          notes: selectedSession.notes,
        };

        await updateSession(selectedSession.id, updatedSession);
        setIsEditing(false);  // Return to view-only mode after saving
      } catch (err) {
        setError("Failed to update session");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      {/* Session List - 25% width */}
      <Box sx={{ flex: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
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
                  <TableCell>{session.client?.user.first_name} {session.client?.user.last_name}</TableCell>
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

              {isEditing ? (
                <>
                  <TextField
                    label="Date"
                    value={selectedSession.date}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) => setSelectedSession({ ...selectedSession, date: e.target.value })}
                  />
                  <TextField
                    label="Session Type"
                    value={selectedSession.session_type}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) => setSelectedSession({ ...selectedSession, session_type: e.target.value })}
                  />
                  <TextField
                    label="Notes"
                    value={selectedSession.notes || ""}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) => setSelectedSession({ ...selectedSession, notes: e.target.value })}
                  />

                  <Select
                    value={selectedTrainerId || ""}
                    onChange={(e) => setSelectedTrainerId(Number(e.target.value))}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {trainers.map((trainer) => (
                      <MenuItem key={trainer.id} value={trainer.id}>
                        {trainer.user.first_name} {trainer.user.last_name}
                      </MenuItem>
                    ))}
                  </Select>

                  <Button variant="contained" onClick={handleSaveClick} sx={{ mr: 2 }}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography>Date: {selectedSession.date}</Typography>
                  <Typography>Type: {selectedSession.session_type}</Typography>
                  <Typography>Notes: {selectedSession.notes}</Typography>
                  <Typography>
                    Trainer: {selectedSession.trainer?.user.first_name}{" "}
                    {selectedSession.trainer?.user.last_name}
                  </Typography>
                  <Button variant="contained" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
