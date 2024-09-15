// src/interfaces/session.ts

import { Client } from './client';
import { Trainer } from './trainer';

export interface Session {
    id: number;
    client: Client;
    trainer: Trainer;
    session_type: string;
    date: string; // ISO date string
    notes?: string;
}
