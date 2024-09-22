// File: components/common/BaseListDetails.tsx
"use client";

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client } from '../../interfaces/client'; // Import the Client interface

interface BaseListDetailsProps {
  selectedItem: Client;
  getItemDetails: (item: Client) => string;
}

const BaseListDetails = ({ selectedItem, getItemDetails }: BaseListDetailsProps) => {
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
