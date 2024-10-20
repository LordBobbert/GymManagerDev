// File: src/app/admin/sessions/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Session } from '@/interfaces/session';
import { addSession, fetchSessions, fetchSessionById } from '@/services/sessionService';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isAddSessionModalOpen, setAddSessionModalOpen] = useState(false);

  const loadSessions = async () => {
    try {
      const sessionData = await fetchSessions();
      setSessions(sessionData);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCloseAddSessionModal = () => {
    setAddSessionModalOpen(false);
  };

  const handleAddSession = async (sessionPayload: Omit<Session, 'id'>) => {
    try {
      const addedSession = await addSession(sessionPayload);
      // Refetch the full session object with 'id'
      const fullSession = await fetchSessionById(addedSession.id);
      setSessions((prevSessions) => [...prevSessions, fullSession]); // Add the full session
      handleCloseAddSessionModal(); // Close modal after adding
    } catch (error) {
      console.error('Failed to add session:', error);
    }
  };

  return (
    <div>
      {/* Render the list of sessions */}
      <ul>
  {sessions.map((session) => (
    <li key={session.id}>
      {/* Safely access client fields */}
      {typeof session.client === 'object' && 'first_name' in session.client && 'last_name' in session.client
        ? `${session.client.first_name} ${session.client.last_name}`
        : 'Unknown Client'} 
      - {session.session_type} - {session.date}
    </li>
  ))}
</ul>
    </div>
  );
};

export default SessionsPage;
