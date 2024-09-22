// File: components/common/BaseList.tsx
"use client";

import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Client } from '../../interfaces/client';  // Import the Client interface

interface BaseListProps {
  items: Client[];  // Array of clients
  onItemClick: (item: Client) => void;  // Handle client selection
}

const BaseList = ({ items, onItemClick }: BaseListProps) => {
  return (
    <List>
      {items.map((client) => (
        <ListItemButton key={client.id} onClick={() => onItemClick(client)}>
          {/* Render client name directly */}
          <ListItemText primary={`${client.user.first_name} ${client.user.last_name}`} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default BaseList;
