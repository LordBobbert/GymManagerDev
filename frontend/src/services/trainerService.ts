// File: src/services/trainerService.ts

import { Trainer } from '../interfaces/trainer';

// File: src/services/trainerService.ts
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


export const addTrainer = async (newTrainer: Omit<Trainer, 'id'>): Promise<Trainer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrainer),
  });

  if (!response.ok) throw new Error('Failed to add trainer');
  return response.json();
};

export const updateTrainer = async (id: number, updatedTrainer: Partial<Trainer>): Promise<Trainer> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/${id}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTrainer),
  });

  if (!response.ok) throw new Error('Failed to update trainer');
  return response.json();
};
