// File: src/components/common/BaseList.tsx

import React from 'react';
import { Box, Typography, ListItemButton } from '@mui/material';
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
    <div style={{ flex: 1 }}>
      {/* Heading and Action Button container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2, // Margin-bottom for some spacing
          padding: '0 16px', // Add equal left and right padding for spacing
        }}
      >
        {/* Heading aligned to the left */}
        <Typography variant="h5" component="h1">
          {getHeading()}
        </Typography>

        {/* Action button aligned to the right */}
        <ActionButton section={section} onClick={handleAddItemClick} />
      </Box>

      {/* Render the list items */}
      <ul>
        {data.map((item) => (
          <ListItemButton
            key={getKey(item)} // Use the item's id or unique key
            onClick={() => onSelect(item)}
            sx={{
              mb: 1,
              borderRadius: 1,
              border: '1px solid #ccc',
              '&:hover': { backgroundColor: '#f0f0f0' },
              padding: '8px 16px', // Add padding to the list item for better appearance
            }}
          >
            {renderItem(item)} {/* Render each item based on provided function */}
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
};

export default BaseList;
