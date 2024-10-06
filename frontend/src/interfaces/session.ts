// src/interfaces/session.ts

import { Client } from './depriclient';
import { Trainer } from './depritrainer';

export interface Session {
    id: number;
    client?: Client;
    trainer?: Trainer | { id: number }; // Allow either a full Trainer object or just an ID
    session_type: string;
    date: string; // ISO date string
    notes?: string;
  }