// File: components/BaseListDetails.tsx
"use client";
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface BaseListDetailsProps<T> {
  selectedItem: T | null;
  getItemDetails: (item: T) => string;
}

const BaseListDetails = <T extends { id: string; name: string }>({
  selectedItem,
  getItemDetails,
}: BaseListDetailsProps<T>) => {
  if (!selectedItem) {
    return <Typography>Select an item to view details.</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{selectedItem.name}</Typography>
        <Typography>{getItemDetails(selectedItem)}</Typography>
      </CardContent>
    </Card>
  );
};

export default BaseListDetails;
