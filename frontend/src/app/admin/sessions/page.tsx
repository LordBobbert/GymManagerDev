// File: src/app/sessions/page.tsx

"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSessions, addSession } from "@/services/sessionService";
import { fetchTrainers } from "@/services/trainerService";
import { fetchClients } from "@/services/clientService";
import { Session } from "@/interfaces/session";
import { Trainer } from "@/interfaces/trainer";
import { Client } from "@/interfaces/client";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import { getSessionFieldConfig } from "@/config/fieldConfigs";
import AddSessionModal from "@/components/admin/AddSessionModal";
import SessionTable from "@/components/admin/SessionTable";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
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

  const handleAddSession = async (newSession: Omit<Session, "id">): Promise<void> => {
    try {
      setLoading(true);
      const addedSession = await addSession(newSession);  // This is asynchronous
      setSessions((prevSessions) => [...prevSessions, addedSession]);
      handleCloseAddSessionModal();
    } catch (error) {
      console.error("Failed to add session:", error);
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
          <BaseListDetailsPage
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            onSave={async (updatedSession) => {
              console.log("Session saved", updatedSession);
            }}
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
