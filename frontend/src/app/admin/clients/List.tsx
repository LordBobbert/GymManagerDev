// File: app/admin/clients/List.tsx (Client-Side Component)

'use client'; // Indicates this is a client-side component

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const MyList = ({ items, onItemClick }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem button key={item.id} onClick={() => onItemClick(item)}>
          <ListItemText primary={item.name} secondary={item.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default MyList;
