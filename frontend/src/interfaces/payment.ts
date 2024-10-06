// File: src/interfaces/payment.ts

import { User } from './user';  // Use the consolidated User interface

export interface Payment {
  id: number;
  amount: number;
  date: string;
  client: User;  // Replace Client with User to refer to a client
  method: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';  // Example payment methods
  status: 'pending' | 'completed' | 'failed';
}
