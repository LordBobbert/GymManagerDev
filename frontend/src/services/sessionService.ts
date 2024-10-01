// File: src/services/sessionService.ts

import { Session } from '../interfaces/session';

export const fetchSessions = async (): Promise<Session[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return await res.json();
};

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

export const updateSession = async (id: number, updatedSession: Partial<Session>): Promise<Session> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/${id}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSession),
  });

  if (!response.ok) throw new Error('Failed to update session');
  return response.json();
};