// File: src/app/admin/clients/page.tsx
"use client";  // Ensure it's a client component

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch clients data
    const fetchClients = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
          credentials: 'include',  // Ensures cookies are included
        });

        if (!res.ok) {
          // If response is not OK, handle the error
          const errorText = await res.text();
          setError(`Error loading clients: ${errorText}`);
          return;
        }

        // Parse the response JSON
        const clientsData: Client[] = await res.json();
        setClients(clientsData);
      } catch (err) {
        // If an error occurs during the fetch
        setError('Failed to load clients.');
        console.error('Fetch error:', err);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (error) {
    return <div>{error}</div>;
  }

  if (!clients) {
    // Show a loading indicator while data is being fetched
    return <div>Loading clients...</div>;
  }

  return (
    <BaseListDetailsPage
      data={clients}
      renderItem={(client) => (
        <span>{client.user.first_name} {client.user.last_name}</span>
      )}
      renderDetails={(client) => (
        <div>
          <h2>{client.user.first_name} {client.user.last_name}</h2>
          <p>Email: {client.user.email}</p>
          <p>Phone: {client.user.phone_number}</p>
          <p>Training Status: {client.training_status}</p>
          {/* More client details here */}
        </div>
      )}
    />
  );
};

export default ClientsPage;
