"use client";

import React, { useEffect, useState } from 'react';
import BaseList from '../../../components/common/BaseList';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import AddSessionForm from '../../../components/admin/AddSessionForm';
import { Session } from '../../../interfaces/session';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer';
import { fetchSessions, addSession, updateSession } from '../../../services/sessionService';
import { fetchClients } from '../../../services/clientService';
import { fetchTrainers } from '../../../services/trainerService';
import { getSessionFieldConfig } from '../../../config/fieldConfigs';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [clients, setClients] = useState<Client[]>([]);  // Explicitly typed as Client[]
  const [trainers, setTrainers] = useState<Trainer[]>([]);  // Explicitly typed as Trainer[]
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchSessions(), fetchClients(), fetchTrainers()])
      .then(([sessionsData, clientsData, trainersData]) => {
        setSessions(sessionsData);
        setClients(clientsData);  // Set clients data
        setTrainers(trainersData);  // Set trainers data
      })
      .catch(() => setError('Failed to load sessions, clients, or trainers'))
      .finally(() => setLoading(false));
  }, []);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(null); 
    setTimeout(() => {
      setSelectedSession(session);
    }, 0); 
  };

  const handleSessionSave = async (updatedSession: Partial<Session>) => {
    try {
      if (selectedSession) {
        await updateSession(selectedSession.id, updatedSession);
        const updatedSessions = await fetchSessions();
        setSessions(updatedSessions);
        setSelectedSession(null);  // Reset selected session to force UI update
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleAddSessionSubmit = async (newSession: Omit<Session, 'id'>) => {
    try {
      await addSession(newSession);
      setIsAddSessionOpen(false);
      const updatedSessions = await fetchSessions();
      setSessions(updatedSessions);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!sessions || !clients || !trainers) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <BaseList<Session>
          data={sessions}
          section="sessions"
          getKey={(session) => session.id}
          onSelect={handleSessionSelect}
          renderItem={(session: Session) => (
            <span>{session.date} - {session.client?.user.first_name} {session.client?.user.last_name} with {session.trainer?.user.first_name} {session.trainer?.user.last_name}</span>
          )}
          onAddClient={() => setIsAddSessionOpen(true)}
        />
      </div>

      {selectedSession && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}
            onSave={handleSessionSave}
          />
        </div>
      )}

      <AddSessionForm
        open={isAddSessionOpen}
        onClose={() => setIsAddSessionOpen(false)}
        onSubmit={handleAddSessionSubmit}
        clients={clients}  // Pass clients to AddSessionForm
        trainers={trainers}  // Pass trainers to AddSessionForm
        loading={loading}
      />
    </div>
  );
};

export default SessionsPage;
