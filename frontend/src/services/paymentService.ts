// File: src/services/paymentService.ts

import { Payment } from '../interfaces/payment';

// Fetch all payments for a specific client
export const fetchPayments = async (clientId: number): Promise<Payment[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments?client_id=${clientId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payments');
  }

  return await res.json();
};

// Add a new payment
export const addPayment = async (newPayment: Omit<Payment, 'id'>): Promise<Payment> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPayment),
  });

  if (!response.ok) throw new Error('Failed to add payment');
  return response.json();
};

// Update an existing payment
export const updatePayment = async (id: number, updatedFields: Partial<Payment>): Promise<Payment> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });

  if (!response.ok) {
    throw new Error(`Failed to update payment with ID ${id}`);
  }

  return response.json();
};

// Delete a payment
export const deletePayment = async (paymentId: number): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/${paymentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete payment with ID ${paymentId}`);
  }
};
