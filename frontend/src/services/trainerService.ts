// File: src/services/trainerService.ts

import { Trainer } from '../interfaces/trainer';

export const fetchTrainers = async (): Promise<Trainer[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/trainers/`, {
    method: 'GET',
    credentials: 'include', // Automatically include cookies
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trainers');
  }

  return await res.json();
};
