// File: src/components/common/BaseList.tsx

import React from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import ActionButton from './ActionButton';

interface BaseListProps<T> {
  data: T[];
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  section: 'clients' | 'trainers' | 'sessions';
  getKey: (item: T) => string | number;
}

const BaseList = <T,>({
  data,
  onSelect,
  renderItem,
  section,
  getKey,
}: BaseListProps<T>) => {
  const handleAddItemClick = () => {
    console.log(`Add new ${section}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Heading and Action Button container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5">{section.charAt(0).toUpperCase() + section.slice(1)} List</Typography>
        <ActionButton section={section} onClick={handleAddItemClick} />
      </Box>

      {/* List of items */}
      <List sx={{ flexGrow: 1 }}>
        {data.map((item) => (
          <ListItemButton key={getKey(item)} onClick={() => onSelect(item)}>
            {renderItem(item)}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default BaseList;
