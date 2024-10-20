// File: src/services/sessionService.ts

import { Session } from '../interfaces/session';
import { handleResponse } from '@/utils/apiHelpers';

export const fetchSessions = async (queryParams: string = ''): Promise<Session[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions${queryParams}`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res, 'Failed to fetch sessions');
};

export const addSession = async (newSession: Omit<Session, 'id'>): Promise<Session> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSession),
  });
  return handleResponse(res, 'Failed to add session');
};

// Similarly update other CRUD functions
