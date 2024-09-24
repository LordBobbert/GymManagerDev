// File: src/app/admin/clients/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetch clients data from the server
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
          credentials: 'include',  // Ensure cookies are included in the request
        });

        // Check if the response is HTML (indicating a redirect to login page)
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          setError('You must be logged in to view clients.');
          return;
        }

        if (!res.ok) {
          throw new Error('Error loading clients.');
        }

        const data: Client[] = await res.json();  // Parse the JSON response
        setClients(data);  // Set the fetched clients
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);  // The empty array means the effect runs once when the component mounts

  // Display loading state
  if (loading) {
    return <div>Loading clients...</div>;
  }

  // Display error message if any
  if (error) {
    return <div>{error}</div>;
  }

  // Pass the clients array as 'data' to the BaseListDetailsPage component
  return <BaseListDetailsPage data={clients} />;
};

export default ClientsPage;
