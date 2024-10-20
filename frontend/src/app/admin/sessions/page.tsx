// File: src/app/admin/sessions/page.tsx
"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import { Session } from '@/interfaces/session';
import { fetchSessions } from '@/services/sessionService';

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

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

  return (
    <div>
      {/* Render the list of sessions */}
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
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
