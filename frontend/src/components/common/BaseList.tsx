// File: components/common/BaseList.tsx
"use client";

import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Client } from '../../interfaces/client';  // Ensure Client interface is imported

interface BaseListProps {
  items: Client[];  // Array of clients (or other items)
  onItemClick: (item: Client) => void;  // Callback for handling item clicks
}

const BaseList = ({ items, onItemClick }: BaseListProps) => {
  return (
    <List>
      {items.map((client) => (
        <ListItemButton key={client.id} onClick={() => onItemClick(client)}>
          <ListItemText primary={`${client.user.first_name} ${client.user.last_name}`} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default BaseList;
