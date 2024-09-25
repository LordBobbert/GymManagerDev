// File: src/components/common/BaseList.tsx

import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import ActionButton from './ActionButton'; // Import the ActionButton component

interface BaseListProps<T> {
  data: T[]; // Generic data type
  onSelect: (item: T) => void; // Item selection handler
  renderItem: (item: T) => React.ReactNode; // Custom render function for list items
  section: 'clients' | 'trainers' | 'sessions'; // Section type for heading and button text
}

const BaseList = <T,>({ data, onSelect, renderItem, section }: BaseListProps<T>) => {
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
          <li key={(item as any).id} onClick={() => onSelect(item)}>
            {renderItem(item)} {/* Render each item based on the provided function */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseList;
