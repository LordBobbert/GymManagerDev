// File: src/services/sessionService.ts

import { CRUDService } from './CRUDService';
import { Session } from '../interfaces/session';

const sessionUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/training-sessions/sessions`;

export const fetchSessions = (queryParams: string = '') => 
  CRUDService.fetchAll<Session>(`${sessionUrl}${queryParams}`);

export const fetchSessionById = (id: number) => 
  CRUDService.fetchById<Session>(sessionUrl, id);

export const addSession = (newSession: Omit<Session, 'id'>) => 
  CRUDService.create(sessionUrl, newSession);

// Ensure `updateSession` is correctly defined and exported
export const updateSession = (id: number, updatedSession: Partial<Session>) => 
  CRUDService.update(sessionUrl, id, updatedSession);

export const deleteSession = (id: number) => 
  CRUDService.delete(sessionUrl, id);
