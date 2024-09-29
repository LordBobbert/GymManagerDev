// File: src/interfaces/payment.ts

import { Client } from './client';

export interface Payment {
  id: number;
  client: Client;  // Assuming each payment is associated with a client
  date: string;    // ISO date string
  amount: number;  // Payment amount
  status: string;  // Status of the payment (e.g., "paid", "pending", "failed")
}
