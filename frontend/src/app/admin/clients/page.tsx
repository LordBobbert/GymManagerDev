// File: src/app/admin/clients/page.tsx
import React from 'react';
import BaseListDetailsPage from '../../../components/common/BaseListDetailsPage';
import { Client } from '../../../interfaces/client';  // Import the Client interface

const ClientsPage = async () => {
  try {
    // Fetch clients data from the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/clients/`, {
      credentials: 'include',  // Cookies will be included automatically
    });

    // Log status and content-type for debugging
    console.log("Response status:", res.status);
    console.log("Response content-type:", res.headers.get('content-type'));

    // Check if response is not OK (e.g., 4xx or 5xx status codes)
    if (!res.ok) {
      const errorText = await res.text();  // Read the full response body
      console.error("Error loading clients:", errorText);
      return <div>Error loading clients: {errorText}</div>;
    }

    // Check if the response is in JSON format before attempting to parse
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await res.text();
      console.error("Non-JSON response:", errorText);
      return <div>Error loading clients: Non-JSON response received. {errorText}</div>;
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
