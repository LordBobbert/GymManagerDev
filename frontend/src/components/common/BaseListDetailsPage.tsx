// File: components/BaseListDetailsPage.tsx
"use client";

import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client';

interface BaseListDetailsPageProps {
  data: Client[];
  getItemText: (item: Client) => string;
  getItemDetails: (item: Client) => string;
}

const BaseListDetailsPage = ({ data, getItemText, getItemDetails }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);

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
