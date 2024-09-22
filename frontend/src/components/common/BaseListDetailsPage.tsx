// File: src/components/common/BaseListDetailsPage.tsx
"use client";  // Ensure this is a Client Component

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client'; // Adjust path if needed

interface BaseListDetailsPageProps {
  data: Client[];  // Only pass the data, no functions
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

  // Move these functions into the Client Component
  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        <BaseList items={data} onItemClick={handleItemClick} getItemText={getItemText} />
      </Box>
      <Box width="75%" pl={2}>
        <BaseListDetails selectedItem={selectedItem} getItemDetails={getItemDetails} />
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
