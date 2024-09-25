// File: src/components/common/ActionButton.tsx

import React from 'react';
import { Button } from '@mui/material';

interface ActionButtonProps {
  section: 'clients' | 'trainers' | 'sessions';
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ section, onClick }) => {
  const getLabel = () => {
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
    <Button variant="contained" onClick={onClick}>
      {getLabel()}
    </Button>
  );
};

export default ActionButton;
