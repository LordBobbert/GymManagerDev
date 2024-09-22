// File: components/common/BaseListDetailsPage.tsx
"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client'; // Import the Client interface

interface BaseListDetailsPageProps {
  data: Client[];  // Array of clients, properly typed
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

  // These functions are defined inside the Client Component
  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) =>
    `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        <BaseList items={data} onItemClick={handleItemClick} getItemText={getItemText} />
      </Box>
      <Box width="75%" pl={2}>
        {selectedItem && (
          <BaseListDetails selectedItem={selectedItem} getItemDetails={getItemDetails} />
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
