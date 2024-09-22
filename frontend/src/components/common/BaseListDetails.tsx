// File: src/components/common/BaseListDetails.tsx
"use client";

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client } from '../../interfaces/client';  // Import your Client interface

interface BaseListDetailsProps {
  selectedItem: Client | null;
  getItemDetails: (item: Client) => string;
}

const BaseListDetails = ({ selectedItem, getItemDetails }: BaseListDetailsProps) => {
  if (!selectedItem) {
    return <Typography>Select an item to view details.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        {/* Display selected client details */}
        <Typography variant="h5">
          {selectedItem.user.first_name} {selectedItem.user.last_name}
        </Typography>
        <Typography>{getItemDetails(selectedItem)}</Typography>
      </CardContent>
    </Card>
  );
};

export default BaseListDetails;
