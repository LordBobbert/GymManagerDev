// File: src/app/admin/sessions/SessionsPage.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseList from './../../components/common/BaseList';
import BaseListDetailsPage from './../../components/common/BaseListDetailsPage';
import AddSessionForm from './../../components/admin/AddSessionForm';
import { Session } from './../../interfaces/session';
import { fetchSessions, addSession, updateSession } from './../../services/sessionService';
import { getSessionFieldConfig } from './../../config/fieldConfigs';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions()
      .then((data) => setSessions(data))
      .catch(() => setError('Failed to load sessions'))
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

  if (!sessions) {
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
          onAddClient={() => setIsAddSessionOpen(true)}  // Use for sessions
        />
      </div>

      {selectedSession && (
        <div style={{ flex: 3 }}>
          <BaseListDetailsPage
            key={selectedSession.id}
            data={selectedSession}
            fieldConfig={getSessionFieldConfig()}  // Session-specific field configuration
            onSave={handleSessionSave}
          />
        </div>
      )}

      <AddSessionForm
        open={isAddSessionOpen}
        onClose={() => setIsAddSessionOpen(false)}
        onSubmit={handleAddSessionSubmit}
        loading={loading}
      />
    </div>
  );
};

export default SessionsPage;
