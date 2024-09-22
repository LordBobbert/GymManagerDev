// File: components/BaseListDetailsPage.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BaseList from './BaseList';
import BaseListDetails from './BaseListDetails';
import { Client } from '../../interfaces/client';

interface BaseListDetailsPageProps {
  data: Client[];
}

const BaseListDetailsPage = ({ data }: BaseListDetailsPageProps) => {
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [itemText, setItemText] = useState<string | null>(null);
  const [itemDetails, setItemDetails] = useState<string | null>(null);

  const handleItemClick = (item: Client) => {
    setSelectedItem(item);
  };

  // Define the client-side functions within useEffect to ensure they're only invoked client-side
  useEffect(() => {
    if (selectedItem) {
      setItemText(`${selectedItem.user.first_name} ${selectedItem.user.last_name}`);
      setItemDetails(`Training Status: ${selectedItem.training_status}, Rate Type: ${selectedItem.rate_type}`);
    }
  }, [selectedItem]);

  return (
    <Box display="flex" height="100%">
      <Box width="25%">
        <BaseList items={data} onItemClick={handleItemClick} getItemText={() => itemText || ''} />
      </Box>
      <Box width="75%" pl={2}>
        <BaseListDetails selectedItem={selectedItem} getItemDetails={() => itemDetails || ''} />
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
