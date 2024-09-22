// File: components/common/BaseListDetailsPage.tsx

"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Client } from '../../interfaces/client';  // Import Client interface

interface BaseListDetailsPageProps {
  data: Client[];
}

// Define the getClientDetails function here
async function getClientDetails(clientId: number): Promise<Client> {
  const res = await fetch(`/api/clients/${clientId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client details");
  }
  const data: Client = await res.json();
  return data;
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [clientDetails, setClientDetails] = useState<Client | null>(null);

  const handleItemClick = async (item: Client) => {
    setSelectedItem(item);  // Set the selected client
    
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
        {/* Render the client list and handle clicks */}
        {data.map(client => (
          <div key={client.id} onClick={() => handleItemClick(client)}>
            {client.user.first_name} {client.user.last_name}
          </div>
        ))}
      </Box>
      <Box width="75%" pl={2}>
        {selectedItem && (
          <>
            <h2>{selectedItem.user.first_name} {selectedItem.user.last_name}</h2>
            {/* Display additional details from clientDetails */}
            <p>{clientDetails ? clientDetails.training_status : 'Loading details...'}</p>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
