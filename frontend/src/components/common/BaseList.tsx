// File: src/components/common/BaseList.tsx

import React, { useState } from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import ActionButton from './ActionButton';

interface BaseListProps<T> {
  data: T[];
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  section: 'clients' | 'trainers' | 'sessions';
  getKey: (item: T) => string | number;
  onAddItem?: () => void;
}

const BaseList = <T,>({
  data,
  onSelect,
  renderItem,
  section,
  getKey,
  onAddItem,
}: BaseListProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          {section.charAt(0).toUpperCase() + section.slice(1)} List
        </Typography>
        {onAddItem && <ActionButton section={section} onClick={onAddItem} />}
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {data.map((item) => (
          <ListItemButton
            key={getKey(item)}
            onClick={() => handleSelect(item)}
            selected={item === selectedItem}
            sx={{ mb: 1, borderRadius: 1, border: '1px solid #ccc', '&:hover': { backgroundColor: '#f0f0f0' } }}
          >
            {renderItem(item)}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default BaseList;
