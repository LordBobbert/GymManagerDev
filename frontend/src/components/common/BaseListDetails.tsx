// File: components/common/BaseListDetails.tsx
"use client";

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client } from '../../interfaces/client';  // Import the Client interface

interface BaseListDetailsProps {
  selectedItem: Client;  // The selected client object
}

const BaseListDetails = ({ selectedItem }: BaseListDetailsProps) => {
  return (
    <Card>
      <CardContent>
        {/* Render the selected client's name */}
        <Typography variant="h5">
          {selectedItem.user.first_name} {selectedItem.user.last_name}
        </Typography>
        {/* Render the selected client's training status and rate type */}
        <Typography>
          Training Status: {selectedItem.training_status}, Rate Type: {selectedItem.rate_type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BaseListDetails;
