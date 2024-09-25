// File: src/app/admin/clients/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';
import { fetchClients } from '../../../services/clientService';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the access token from cookies
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (!accessToken) {
      setError('You must be logged in to view clients.');
      return;
    }

    // Fetch clients
    fetchClients(accessToken)
      .then((data) => setClients(data))
      .catch(() => setError('Failed to load clients.'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    return <div>Loading...</div>;
  }

  // `renderItem` function to render each client in the list
  const renderItem = (client: Client) => (
    <span>{client.user.first_name} {client.user.last_name}</span>
  );

  // `renderDetails` function to render the selected client's details
  const renderDetails = (client: Client) => (
    <div>
      <h2>{client.user.first_name} {client.user.last_name}</h2>
      <p>Email: {client.user.email}</p>
      <p>Phone: {client.user.phone_number}</p>
      <p>Training Status: {client.training_status}</p>
      {/* Additional client details */}
    </div>
  );

  return (
    <BaseListDetailsPage
      data={clients}
      renderItem={renderItem}
      renderDetails={renderDetails}
    />
  );
};

export default ClientsPage;
