import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Client } from '../../interfaces/client';
import { clientFieldConfig } from '../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';
import { Trainer } from '../../interfaces/trainer';

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<Client, 'id'>) => void;
  trainers: Trainer[]; // Pass trainers as a prop
  loading: boolean; // Loading state for trainers
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
    console.log(`Changing ${key} to ${value}`);
    setFormData((prev) => setNestedValue(prev, key, value));
  };

  const handleSave = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {clientFieldConfig.map(({ label, key, type }) => {
            const value = getNestedValue(formData, key as string) || '';
            return (
              <TextField
                key={String(key)}
                label={label}
                type={type}
                value={value}
                onChange={(e) => handleChange(key as string, e.target.value)}
              />
            );
          })}

          {/* Trainer dropdown */}
          <InputLabel id="trainer-select-label">Trainer</InputLabel>
          <Select
            labelId="trainer-select-label"
            id="trainer-select"
            value={formData.trainer?.id || ''} // Show selected trainer's ID
            label="Trainer"
            onChange={(e) => handleChange('trainer_id', e.target.value)} // Set trainer_id on selection
          >
            {loading ? (
              <MenuItem disabled>Loading trainers...</MenuItem>
            ) : (
              trainers.map((trainer) => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.user.first_name} {trainer.user.last_name}
                </MenuItem>
              ))
            )}
          </Select>
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
