// File: src/components/admin/AddClientForm.tsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem } from '@mui/material';
import { Client } from '../../interfaces/client';
import { clientFieldConfig } from '../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';
import { Trainer } from '../../interfaces/trainer';  // Assuming this exists

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<Client, 'id'>) => void;
  trainers: Trainer[];  // Pass trainers for dropdown
  loading: boolean;     // Show loading indicator
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, trainers, loading }) => {
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

          {/* Trainer Dropdown */}
          <TextField
            select
            label="Trainer"
            value={formData.trainer?.id || ''}
            onChange={(e) => {
                const selectedTrainer = trainers.find((trainer) => trainer.id === parseInt(e.target.value));
                handleChange('trainer', selectedTrainer ? selectedTrainer.id : '');  // Pass only the trainer's id
              }}              
            disabled={loading}
          >
            {trainers.map((trainer) => (
              <MenuItem key={trainer.id} value={trainer.id}>
                {trainer.user.first_name} {trainer.user.last_name}
              </MenuItem>
            ))}
          </TextField>
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
