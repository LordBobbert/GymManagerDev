// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Paper } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  clients?: { id: number; user: { first_name: string; last_name: string } }[];  // Add clients prop
  trainers?: { id: number; user: { first_name: string; last_name: string } }[]; // Add trainers prop
  onSave: (updatedItem: Partial<T>) => Promise<void>;
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  clients = [],
  trainers = [],
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);
  const [modifiedData, setModifiedData] = useState<Partial<T>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => setNestedValue({ ...prev }, key, value));
    setModifiedData((prev) => setNestedValue({ ...prev }, key, value));
  };

  const handleSave = async () => {
    if (Object.keys(modifiedData).length > 0) {
      await onSave(modifiedData);
      setIsEditing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginLeft: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        {fieldConfig.map(({ label, key, type, options }) => {
          let value = getNestedValue(formData || {}, key as string) || '';

          // Handle special cases for date, clients, and trainers
          if (key === 'date') {
            value = typeof value === 'string' ? value.split('T')[0] : '';  // Ensure the correct date format for input
          }

          return (
            <Grid item xs={12} sm={6} key={String(key)}>
              {isEditing && key === 'client' && clients.length > 0 ? (
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={getNestedValue(formData || {}, key as string) || ''}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                  >
                    {clients.map((client) => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.user.first_name} {client.user.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : isEditing && key === 'trainer' && trainers.length > 0 ? (
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={getNestedValue(formData || {}, key as string) || ''}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                  >
                    {trainers.map((trainer) => (
                      <MenuItem key={trainer.id} value={trainer.id}>
                        {trainer.user.first_name} {trainer.user.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : isEditing && options ? (
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    label={label}
                    value={value}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label={label}
                  type={type || 'text'}
                  value={value}
                  onChange={(e) => handleChange(key as string, e.target.value)}
                  fullWidth
                  disabled={!isEditing}
                />
              )}
            </Grid>
          );
        })}
      </Grid>

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        {isEditing ? (
          <>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={Object.keys(modifiedData).length === 0}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default BaseListDetailsPage;
