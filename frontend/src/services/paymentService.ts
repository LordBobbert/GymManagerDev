// File: src/services/paymentService.ts

import { CRUDService } from './CRUDService';
import { handleResponse } from '@/utils/apiHelpers';
import { Payment } from '../interfaces/payment';

const paymentUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments`;

// Fetch all payments for a specific client
export const fetchPayments = async (clientId: number): Promise<Payment[]> => {
  const res = await fetch(`${paymentUrl}?client_id=${clientId}`, {
    method: 'GET',
    credentials: 'include',
  });

  // Use handleResponse to process the fetch response
  return handleResponse(res, 'Failed to fetch payments');
};

// Add a new payment
export const addPayment = async (newPayment: Omit<Payment, 'id'>): Promise<Payment> => {
  const res = await fetch(`${paymentUrl}/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPayment),
  });

  // Use handleResponse to process the fetch response
  return handleResponse(res, 'Failed to add payment');
};

// Update an existing payment
export const updatePayment = async (id: number, updatedFields: Partial<Payment>): Promise<Payment> => {
  const res = await fetch(`${paymentUrl}/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });

  // Use handleResponse to process the fetch response
  return handleResponse(res, `Failed to update payment with ID ${id}`);
};

// Delete a payment
export const deletePayment = async (paymentId: number): Promise<void> => {
  const res = await fetch(`${paymentUrl}/${paymentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  // Use handleResponse to process the fetch response
  await handleResponse(res, `Failed to delete payment with ID ${paymentId}`);
};
