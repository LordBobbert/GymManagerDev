// File: src/components/admin/AddClientForm.tsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { User } from '../../interfaces/user';  // Using the unified User model
import { getClientFieldConfig } from './../../config/fieldConfigs';  // Client-specific fields configuration
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (newClient: Omit<User, 'id'>) => Promise<void>;
  trainers: User[];  // Trainers are now Users with the 'trainer' role
  loading: boolean;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, trainers, loading }) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    gender: undefined,
    birthday: undefined,
    roles: ['client'],  // Predefined 'client' role
    training_status: 'active',
    personal_training_rate: 0,
    rate_type: 'one_on_one',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    trainer_id: undefined,  // Selected trainer's ID
  });

  // Correctly typing the handleChange function
  const handleChange = <K extends keyof Omit<User, 'id'>>(key: K, value: User[K]) => {
    setFormData((prev) => setNestedValue(prev, key, value));
  };

  const handleSave = () => {
    onSubmit(formData);  // Submit the form data
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Map through the client field config to generate form fields */}
          {getClientFieldConfig().map(({ label, key, type }) => {
            const value = getNestedValue(formData, key as keyof Omit<User, 'id'>) || '';  // Access flat fields

            return (
              <TextField
                key={String(key)}
                label={label}
                type={type}
                value={value}
                onChange={(e) => handleChange(key as keyof Omit<User, 'id'>, e.target.value as User[keyof User])}
                fullWidth
              />
            );
          })}

          {/* Trainer dropdown selection */}
          <InputLabel>Trainer</InputLabel>
          <Select
            value={formData.trainer_id || ''}  // Use trainer_id directly
            onChange={(e) => handleChange('trainer_id', Number(e.target.value))}
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {trainers.map((trainer) => (
              <MenuItem key={trainer.id} value={trainer.id}>
                {trainer.first_name} {trainer.last_name}
              </MenuItem>
            ))}
          </Select>

          {/* Show loader if in loading state */}
          {loading && <CircularProgress />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}  // Disable button when loading
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientForm;
