// File: components/BaseList.tsx
"use client";

import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

interface BaseListProps<T> {
  items: T[];
  onItemClick: (item: T) => void;
  renderText: (item: T) => string;
}

const BaseList = <T extends { id: string | number }>({
  items,
  onItemClick,
  renderText,
}: BaseListProps<T>) => {
  return (
    <List>
      {items.map((item) => (
        <ListItemButton key={item.id} onClick={() => onItemClick(item)}>
          <ListItemText primary={renderText(item)} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default BaseList;
