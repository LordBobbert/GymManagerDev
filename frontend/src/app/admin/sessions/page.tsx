// File: src/app/sessions/page.tsx

"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSessions, addSession, updateSession } from "@/services/sessionService";
import { fetchUsersByRole } from "@/services/userService";
import { Session } from "@/interfaces/session";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddSessionModal from "@/components/admin/AddSessionModal";
import SessionTable from "@/components/admin/SessionTable";
import { getSessionFieldConfig } from "@/config/fieldConfigs";
import { User } from "@/interfaces/user";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [trainers, setTrainers] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadSessionsData = async () => {
      try {
        const [fetchedSessions, fetchedTrainers, fetchedClients] = await Promise.all([
          fetchSessions(),
          fetchUsersByRole("trainer"),
          fetchUsersByRole("client"),
        ]);

        setSessions(fetchedSessions);
        setTrainers(fetchedTrainers);
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

  const handleAddSession = async (newSession: {
    client_id: number;
    trainer_id: number;
    session_type: string;
    date: string;
    notes?: string;
  }): Promise<void> => {
    try {
      setLoading(true);

      // Payload creation
      const sessionPayload: Omit<Session, "id"> = {
        client: { id: newSession.client_id },  // Ensure client is an object with at least an id
        trainer: { id: newSession.trainer_id },  // Ensure trainer is an object with at least an id
        session_type: newSession.session_type,
        date: newSession.date,
        notes: newSession.notes || "",
      };

      const addedSession = await addSession(sessionPayload);
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
        prevSessions.map((session) => (session.id === savedSession.id ? savedSession : session))
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
        trainers={trainers}
      />

      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <BaseListDetailsPage<Session>
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            clients={clients}
            trainers={trainers}
            onSave={handleSaveSession}
            isEditing={true}
            handleChange={() => {}}
          />
        </Box>
      )}

      {/* Add Session Modal */}
      <AddSessionModal
        open={isAddSessionModalOpen}
        onClose={handleCloseAddSessionModal}
        onSubmit={handleAddSession}
        clients={clients}
        trainers={trainers}
        loading={loading}
      />
    </Box>
  );
};

export default SessionsPage;
