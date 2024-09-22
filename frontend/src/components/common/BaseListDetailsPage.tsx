// File: components/BaseListDetailsPage.tsx
"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client';  // Ensure the Client interface is imported correctly

// Ensure props accept 'data' of type Client[]
interface BaseListDetailsPageProps {
  data: Client[];  // Type the data as an array of Client
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        <BaseList
          items={data}
          onItemClick={handleItemClick}
          renderText={(client) => `${client.user.first_name} ${client.user.last_name}`}
        />
      </Box>
      <Box width="75%" pl={2}>
        {selectedItem && (
          <BaseListDetails
            selectedItem={selectedItem}
            renderDetails={(client) => `Training Status: ${client.training_status}, Rate Type: ${client.rate_type}`}
          />
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
