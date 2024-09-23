// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface

const ClientsPage = async () => {
  try {
    // Fetch clients data from the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/clients/`, {
      credentials: 'include',  // Cookies will be included automatically
    });

    // Check if response is not OK (e.g., 4xx or 5xx status codes)
    if (!res.ok) {
      console.error("Error loading clients:", await res.text());
      return <div>Error loading clients.</div>;
    }

    // Check if the response is in JSON format before attempting to parse
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error("Non-JSON response:", await res.text());
      return <div>Error loading clients: Non-JSON response received.</div>;
    }

    // Parse the JSON response
    const clients: Client[] = await res.json();  // Ensure clients are properly typed

    // Pass the clients array as 'data' to the Client Component
    return <BaseListDetailsPage data={clients} />;

  } catch (error) {
    // Catch any network or runtime errors
    console.error("Error fetching clients:", error);
    return <div>Error loading clients: {String(error)}.</div>;
  }
};

export default ClientsPage;
