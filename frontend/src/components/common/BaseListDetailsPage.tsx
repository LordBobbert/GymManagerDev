// File: components/common/BaseListDetailsPage.tsx
"use client";  // Mark this as a Client Component

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client'; // Import the Client interface

interface BaseListDetailsPageProps {
  data: Client[];  // Pass the array of clients as props
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        {/* No more passing functions; handle rendering inside BaseList */}
        <BaseList items={data} onItemClick={handleItemClick} />
      </Box>
      <Box width="75%" pl={2}>
        {/* Render details of the selected item directly in BaseListDetails */}
        {selectedItem && <BaseListDetails selectedItem={selectedItem} />}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
