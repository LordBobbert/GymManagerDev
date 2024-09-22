// File: components/common/BaseList.tsx
"use client";

import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

interface BaseListProps<T> {
  items: T[];
  onItemClick: (item: T) => void;
  getItemText: (item: T) => string;
}

const BaseList = <T extends { id: number }>({
  items,
  onItemClick,
  getItemText,
}: BaseListProps<T>) => {
  return (
    <List>
      {items.map((item) => (
        <ListItemButton key={item.id} onClick={() => onItemClick(item)}>
          <ListItemText primary={getItemText(item)} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default BaseList;
