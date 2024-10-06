// src/interfaces/session.ts

import { User } from './user';

export interface Session {
  id: number;
  client: User | { id: number };  // Can be either User object or just an object with an id
  trainer: User | { id: number };  // Can be either User object or just an object with an id
  session_type: string;
  date: string;
  notes?: string;
}
