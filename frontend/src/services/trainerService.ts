// File: src/services/trainerService.ts

import { Trainer } from '../interfaces/trainer';

/**
 * Fetch all trainers from the API.
 * @returns {Promise<Trainer[]>} A promise that resolves with a list of trainers.
 */
export const fetchTrainers = async (): Promise<Trainer[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trainers');
  }

  return await res.json();
};

/**
 * Fetch a trainer by ID from the API.
 * @param {number} trainerId - The ID of the trainer to fetch.
 * @returns {Promise<Trainer>} A promise that resolves with the trainer data.
 */
export const fetchTrainerById = async (trainerId: number): Promise<Trainer> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/${trainerId}/`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trainer with ID ${trainerId}`);
  }

  return await res.json();
};

/**
 * Add a new trainer to the API.
 * @param {Omit<Trainer, 'id'>} newTrainer - The data for the new trainer.
 * @returns {Promise<Trainer>} A promise that resolves with the newly created trainer data.
 */
export const addTrainer = async (newTrainer: Omit<Trainer, 'id'>): Promise<Trainer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrainer),
  });

  if (!response.ok) {
    throw new Error('Failed to add trainer');
  }

  return response.json();
};

/**
 * Update an existing trainer's data on the API.
 * @param {number} id - The ID of the trainer to update.
 * @param {Partial<Trainer>} updatedTrainer - The data to update for the trainer.
 * @returns {Promise<Trainer>} A promise that resolves with the updated trainer data.
 */
export const updateTrainer = async (id: number, updatedTrainer: Partial<Trainer>): Promise<Trainer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/${id}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTrainer),
  });

  if (!response.ok) {
    throw new Error('Failed to update trainer');
  }

  return response.json();
};
