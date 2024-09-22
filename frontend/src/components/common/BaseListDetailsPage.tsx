// File: src/components/common/BaseListDetailsPage.tsx
"use client"; // Mark this component as client-side

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client';

interface BaseListDetailsPageProps {
  data: Client[];  // Only pass serializable data
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

  // These functions are defined locally inside the Client Component
  const getItemText = (client: Client) => `${client.user.first_name} ${client.user.last_name}`;
  const getItemDetails = (client: Client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`;

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

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
