// File: components/BaseListDetailsPage.tsx
"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';

interface BaseListDetailsPageProps<T> {
  data: T[];
  getItemText: (item: T) => string;
  getItemDetails: (item: T) => string;
}

const BaseListDetailsPage = <T extends { id: string; name: string }>({
  data,
  getItemText,
  getItemDetails,
}: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleItemClick = (item: T) => {
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
