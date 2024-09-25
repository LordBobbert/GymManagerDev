// File: src/app/admin/clients/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from './../../../components/common/BaseListDetailsPage';
import { Client } from './../../../interfaces/client';
import { fetchClients } from './../../../services/clientService'; // Ensure this points to the correct service

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];

    if (!accessToken) {
      setError('You must be logged in to view clients.');
      return;
    }

    fetchClients(accessToken)
      .then(data => {
        if (data) {
          setClients(data);
        } else {
          setError('Failed to load clients.');
        }
      })
      .catch(() => setError('Failed to load clients.'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return clients ? (
    <BaseListDetailsPage
      data={clients}
      renderItem={(client: Client) => <span>{client.user.first_name} {client.user.last_name}</span>}
      renderDetails={(client: Client) => (
        <div>
          <h2>{client.user.first_name} {client.user.last_name}</h2>
          <p>Email: {client.user.email}</p>
          <p>Phone: {client.user.phone_number}</p>
          <p>Training Status: {client.training_status}</p>
        </div>
      )}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default ClientsPage;
