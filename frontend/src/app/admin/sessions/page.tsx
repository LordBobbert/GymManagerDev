// File: src/app/sessions/page.tsx

"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSessions, addSession, updateSession } from "@/services/sessionService";
import { fetchTrainers } from "@/services/trainerService";
import { fetchClients } from "@/services/clientService";
import { Session } from "@/interfaces/session";
import { TrainerProfile } from "@/interfaces/trainer";
import { ClientProfile } from "@/interfaces/client";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddSessionModal from "@/components/admin/AddSessionModal";
import SessionTable from "@/components/admin/SessionTable";
import { getSessionFieldConfig } from "@/config/fieldConfigs";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadSessionsData = async () => {
      try {
        const [fetchedSessions, fetchedTrainers, fetchedClients] = await Promise.all([
          fetchSessions(),
          fetchTrainers(),
          fetchClients(),
        ]);

        setSessions(fetchedSessions);
        setTrainers(fetchedTrainers);  // Keep full TrainerProfile[]
        setClients(fetchedClients);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    loadSessionsData();
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  const handleOpenAddSessionModal = () => setIsAddSessionModalOpen(true);
  const handleCloseAddSessionModal = () => setIsAddSessionModalOpen(false);

  const handleAddSession = async (newSession: Omit<Session, "id">): Promise<void> => {
    try {
      setLoading(true);
      const addedSession = await addSession(newSession);
      setSessions((prevSessions) => [...prevSessions, addedSession]);
      handleCloseAddSessionModal();
    } catch (error) {
      console.error("Failed to add session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSession = async (updatedSession: Partial<Session>): Promise<void> => {
    try {
      setLoading(true);
      const savedSession = await updateSession(updatedSession.id!, updatedSession);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === savedSession.id ? savedSession : session
        )
      );
    } catch (error) {
      console.error("Failed to save session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Sessions</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAddSessionModal}>
          Add Session
        </Button>
      </Box>

      <SessionTable
        sessions={sessions}
        onSessionSelect={handleSessionSelect}
        trainers={trainers}  // Pass full TrainerProfile[]
      />

      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            clients={clients}
            trainers={trainers}  // Pass full TrainerProfile[]
            onSave={handleSaveSession}
            isEditing={true}  // Assuming editing mode is always enabled for selected sessions
            handleChange={() => {}}  // Implement as needed in BaseListDetailsPage
          />
        </Box>
      )}

      {/* Add Session Modal */}
      <AddSessionModal
        open={isAddSessionModalOpen}
        onClose={handleCloseAddSessionModal}
        onSubmit={handleAddSession}
        clients={clients}
        trainers={trainers}  // Pass full TrainerProfile[]
        loading={loading}
      />
    </Box>
  );
};

export default SessionsPage;
