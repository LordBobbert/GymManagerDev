// src/services/trainerApi.ts

import axiosClient from './axiosClient'; // Import your configured axios instance
import { Trainer } from '../interfaces/trainer'; // Import the Trainer interface

// Fetch all trainers
export const fetchTrainers = async (): Promise<Trainer[]> => {
    try {
        const response = await axiosClient.get<Trainer[]>('/api/trainers/');
        return response.data;
    } catch (error) {
        console.error('Error fetching trainers:', error);
        throw error;
    }
};

// Fetch a specific trainer by ID
export const fetchTrainerById = async (trainerId: number): Promise<Trainer> => {
    try {
        const response = await axiosClient.get<Trainer>(`/api/trainers/${trainerId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching trainer with ID ${trainerId}:`, error);
        throw error;
    }
};

// Create a new trainer
export const createTrainer = async (trainerData: Partial<Trainer>): Promise<Trainer> => {
    try {
        const response = await axiosClient.post<Trainer>('/api/trainers/', trainerData);
        return response.data;
    } catch (error) {
        console.error('Error creating trainer:', error);
        throw error;
    }
};

// Update an existing trainer
export const updateTrainer = async (trainerId: number, trainerData: Partial<Trainer>): Promise<Trainer> => {
    try {
        const response = await axiosClient.patch<Trainer>(`/api/trainers/${trainerId}/`, trainerData);
        return response.data;
    } catch (error) {
        console.error(`Error updating trainer with ID ${trainerId}:`, error);
        throw error;
    }
};

// Delete a trainer
export const deleteTrainer = async (trainerId: number): Promise<void> => {
    try {
        await axiosClient.delete(`/api/trainers/${trainerId}/`);
    } catch (error) {
        console.error(`Error deleting trainer with ID ${trainerId}:`, error);
        throw error;
    }
};
