// File: src/components/common/ActionButton.tsx

import React from 'react';
import { Button } from '@mui/material';

interface ActionButtonProps {
  section: 'clients' | 'trainers' | 'sessions'; // Determine which section is active
  onClick: () => void; // Action handler for the button
}

const ActionButton: React.FC<ActionButtonProps> = ({ section, onClick }) => {
  const getButtonLabel = () => {
    switch (section) {
      case 'clients':
        return 'Add Client';
      case 'trainers':
        return 'Add Trainer';
      case 'sessions':
        return 'Add Session';
      default:
        return 'Add Item';
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {getButtonLabel()}
    </Button>
  );
};

export default ActionButton;
