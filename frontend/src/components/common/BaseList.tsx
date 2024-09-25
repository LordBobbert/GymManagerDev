// File: src/components/common/BaseList.tsx

import React from 'react';
import { Box, Typography, List, ListItemButton, Divider, ListItemText } from '@mui/material';
import ActionButton from './ActionButton'; // Import the ActionButton component

interface BaseListProps<T> {
  data: T[]; // Generic data type
  onSelect: (item: T) => void; // Item selection handler
  renderItem: (item: T) => React.ReactNode; // Custom render function for list items
  section: 'clients' | 'trainers' | 'sessions'; // Section type for heading and button text
  getKey: (item: T) => string | number; // Function to get a unique key for each item
}

const BaseList = <T,>({
  data,
  onSelect,
  renderItem,
  section,
  getKey,
}: BaseListProps<T>) => {
  const handleAddItemClick = () => {
    // Handle the "Add" button click here (e.g., open modal, navigate to form, etc.)
    console.log(`Add new ${section}`);
  };

  const getHeading = () => {
    switch (section) {
      case 'clients':
        return 'Clients';
      case 'trainers':
        return 'Trainers';
      case 'sessions':
        return 'Sessions';
      default:
        return 'Items';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      {/* Heading and Action Button container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2, // Margin-bottom for spacing
        }}
      >
        {/* Heading aligned to the left */}
        <Typography variant="h5" component="h1">
          {getHeading()}
        </Typography>

        {/* Action button aligned to the right */}
        <ActionButton section={section} onClick={handleAddItemClick} />
      </Box>

      {/* Divider for separation */}
      <Divider sx={{ mb: 2 }} />

      {/* Render the list items using Material-UI List component */}
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {data.map((item) => (
          <ListItemButton
            key={getKey(item)}
            onClick={() => onSelect(item)}
            sx={{
              mb: 1,
              borderRadius: 1,
              border: '1px solid #ccc',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <ListItemText primary={renderItem(item)} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default BaseList;
