// File: src/app/sessions/page.tsx

"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSessions } from "@/services/sessionService";
import { fetchTrainerById } from "@/services/trainerService";
import { Session } from "@/interfaces/session";
import { Trainer } from "@/interfaces/trainer";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import { getSessionFieldConfig } from "@/config/fieldConfigs";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [trainers, setTrainers] = useState<{ [key: number]: Trainer }>({});

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const fetchedSessions = await fetchSessions();
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      
      }
    };

    loadSessions();
  }, []);

  const handleSessionSelect = async (session: Session) => {
    setSelectedSession(session);

    if (session.trainer && typeof session.trainer === "number") {
      const trainerId = session.trainer;

      if (!trainers[trainerId]) {
        try {
          const fetchedTrainer = await fetchTrainerById(trainerId);
          setTrainers((prev) => ({
            ...prev,
            [trainerId]: fetchedTrainer,
          }));

          // Update session with the fetched trainer object
          setSessions((prevSessions) =>
            prevSessions.map((s) =>
              s.id === session.id ? { ...s, trainer: fetchedTrainer } : s
            )
          );
        } catch (error) {
          console.error(`Failed to fetch trainer with ID ${trainerId}`, error);
        }
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
                <TableCell>{new Date(session.date).toLocaleString()}</TableCell>
                <TableCell>{session.session_type}</TableCell>
                <TableCell>
                  {session.client?.user.first_name} {session.client?.user.last_name}
                </TableCell>
                <TableCell>
                  {typeof session.trainer === "number" ? (
                    trainers[session.trainer] ? (
                      `${trainers[session.trainer].user.first_name} ${trainers[session.trainer].user.last_name}`
                    ) : (
                      "Loading..."
                    )
                  ) : session.trainer && "user" in session.trainer ? (
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
          <BaseListDetailsPage
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            onSave={async (updatedSession) => {
              // Handle save logic for session update
              console.log("Session saved", updatedSession);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SessionsPage;
