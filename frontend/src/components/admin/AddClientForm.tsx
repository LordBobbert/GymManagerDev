// File: src/components/admin/AddClientForm.tsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@mui/material';
import { Client } from '../../interfaces/client';
import { clientFieldConfig } from '../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<Client, 'id'>) => void;  // Changed from onSave to onSubmit
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Client, 'id'>>({
    user: {
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      gender: undefined,
      birthday: undefined,
      roles: [],
    },
    training_status: 'active',
    personal_training_rate: 0,
    rate_type: 'one_on_one',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    trainer: undefined,
  });

  const handleChange = (key: string, value: string | number | boolean) => {
    setFormData((prev) => setNestedValue(prev, key, value));
  };

  const handleSave = () => {
    onSubmit(formData); // Call onSubmit when saving the form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {clientFieldConfig.map(({ label, key, type }) => {
            const value = getNestedValue(formData, key as string) || '';  // Correct usage for retrieving nested value
            return (
              <TextField
                key={String(key)}
                label={label}
                type={type}
                value={value}
                onChange={(e) => handleChange(key as string, e.target.value)}  // Update form data using setNestedValue
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientForm;
