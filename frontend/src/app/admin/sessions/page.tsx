// File: src/app/sessions/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { fetchSessions, addSession, updateSession } from "@/services/sessionService";
import { fetchUsers } from "@/services/userService";  // Unified fetch method for users
import { Session } from "@/interfaces/session";
import { User } from "@/interfaces/user";
import BaseListDetailsPage from "@/components/common/BaseListDetailsPage";
import AddSessionModal from "@/components/admin/AddSessionModal";
import SessionTable from "@/components/admin/SessionTable";
import { getSessionFieldConfig } from "@/config/fieldConfigs";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [users, setUsers] = useState<User[]>([]);  // Unified user array
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddSessionModalOpen, setIsAddSessionModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadSessionsData = async () => {
      try {
        const [fetchedSessions, fetchedUsers] = await Promise.all([
          fetchSessions(),
          fetchUsers(),  // Fetch all users at once
        ]);

        setSessions(fetchedSessions);
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    loadSessionsData();
  }, []);

  // Filter the users based on their roles
  const trainers = users.filter((user) => user.roles.includes("trainer"));
  const clients = users.filter((user) => user.roles.includes("client"));

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  const handleAddSession = async (newSession: Omit<Session, "id">): Promise<void> => {
    try {
      setLoading(true);
      const addedSession = await addSession(newSession);
      setSessions((prevSessions) => [...prevSessions, addedSession]);
      setIsAddSessionModalOpen(false);
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
        <Button variant="contained" color="primary" onClick={() => setIsAddSessionModalOpen(true)}>
          Add Session
        </Button>
      </Box>

      <SessionTable
        sessions={sessions}
        onSessionSelect={handleSessionSelect}
        trainers={trainers}  // Pass filtered trainers
      />

      {selectedSession && (
        <Box sx={{ flex: 3 }}>
          <BaseListDetailsPage<Session>
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            clients={clients}  // Pass filtered clients
            trainers={trainers}  // Pass filtered trainers
            onSave={handleSaveSession}
            isEditing={true}
            handleChange={() => {}}  // Implement handleChange as needed
          />
        </Box>
      )}

      <AddSessionModal
        open={isAddSessionModalOpen}
        onClose={() => setIsAddSessionModalOpen(false)}
        onSubmit={handleAddSession}
        clients={clients}  // Pass filtered clients
        trainers={trainers}  // Pass filtered trainers
        loading={loading}
      />
    </Box>
  );
};

export default SessionsPage;
