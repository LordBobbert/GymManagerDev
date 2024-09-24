// File: components/common/BaseListDetailsPage.tsx
"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client';  // Ensure Client interface is imported

interface BaseListDetailsPageProps {
  data: Client[];
}

// Define the getClientDetails function
async function getClientDetails(clientId: number): Promise<Client> {
  const res = await fetch(`/admin/clients/${clientId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client details");
  }
  const data: Client = await res.json();
  return data;
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [clientDetails, setClientDetails] = useState<Client | null>(null);  // Store client details

  const handleItemClick = async (item: Client) => {
    try {
      const details = await getClientDetails(item.id);  // Fetch detailed client info
      setClientDetails(details);  // Store the detailed client info in state
    } catch (error) {
      console.error("Error fetching client details", error);
      setClientDetails(null);
    }
  };

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        {/* Render the client list */}
        <BaseList items={data} onItemClick={handleItemClick} />
      </Box>
      <Box width="75%" pl={2}>
        {/* Render the details of the selected client */}
        {clientDetails && (
          <BaseListDetails selectedItem={clientDetails} />
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
