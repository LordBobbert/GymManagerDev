// src/api/clientApi.ts
import axiosClient from './axiosClient';
import { Client } from '../interfaces/client';

export const fetchClients = async (cookie?: string): Promise<Client[]> => {
    const response = await axiosClient.get<Client[]>('/api/clients/', {
        withCredentials: true,
        headers: cookie ? { Cookie: cookie } : {},
    });
    return response.data;
};



// Fetch a specific client
export const fetchClientById = async (clientId: number): Promise<Client> => {
    const response = await axiosClient.get<Client>(`/api/clients/${clientId}/`);
    return response.data;
};

// Update client details
export const updateClient = async (clientId: number, updatedData: Partial<Client>): Promise<Client> => {
    const response = await axiosClient.patch<Client>(`/api/clients/${clientId}/`, updatedData);
    return response.data;
};
