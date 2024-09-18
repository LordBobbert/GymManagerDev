// src/services/sessionApi.ts
import axiosClient from './axiosClient';
import { Session } from '../interfaces/session'; // Adjust the path if necessary

// Fetch all sessions
export const fetchSessions = async (): Promise<Session[]> => {
    const response = await axiosClient.get<Session[]>('/api/sessions/');
    return response.data;
};

// Fetch a specific session by ID
export const fetchSessionById = async (id: string): Promise<Session> => {
    const response = await axiosClient.get<Session>(`/api/sessions/${id}/`);
    return response.data;
};

// Create a new session
export const createSession = async (sessionData: Partial<Session>): Promise<Session> => {
    const response = await axiosClient.post<Session>('/api/sessions/', sessionData);
    return response.data;
};

// Update an existing session
export const updateSession = async (id: string, sessionData: Partial<Session>): Promise<Session> => {
    const response = await axiosClient.patch<Session>(`/api/sessions/${id}/`, sessionData);
    return response.data;
};

// Delete a session by ID
export const deleteSession = async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/sessions/${id}/`);
};
