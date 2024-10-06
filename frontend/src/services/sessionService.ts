// File: src/services/sessionService.ts

import { Session } from '../interfaces/session';

// Fetch all sessions (can be filtered by client or trainer)
export const fetchSessions = async (queryParams: string = ''): Promise<Session[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions${queryParams}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return await res.json();
};

// Fetch a session by ID
export const fetchSessionById = async (sessionId: number): Promise<Session> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/${sessionId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch session with ID ${sessionId}`);
  }

  return await res.json();
};

// Add a new session
export const addSession = async (newSession: Omit<Session, 'id'>): Promise<Session> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSession),
  });

  if (!response.ok) throw new Error('Failed to add session');
  return response.json();
};

// Update an existing session
export const updateSession = async (id: number, updatedFields: Partial<Session>): Promise<Session> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error(`Failed to update session with ID ${id}`);
  }

  return response.json();
};

// Delete a session
export const deleteSession = async (sessionId: number): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/${sessionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete session with ID ${sessionId}`);
  }
};
