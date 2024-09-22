// File: components/BaseListDetails.tsx
"use client";

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Client } from '../../interfaces/client';

interface BaseListDetailsProps {
  selectedItem: Client;
  renderDetails: (item: Client) => string;
}

const BaseListDetails = ({ selectedItem, renderDetails }: BaseListDetailsProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {selectedItem.user.first_name} {selectedItem.user.last_name}
        </Typography>
        <Typography>{renderDetails(selectedItem)}</Typography>
      </CardContent>
    </Card>
  );
};

export default BaseListDetails;
