// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: { label: string; field: keyof T; type?: string; options?: any[] }[];
  onSave: (updatedFields: Partial<T>) => Promise<void>;
}

const BaseListDetailsPage = <T,>({ data, fieldConfig, onSave }: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save changes.');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Details' : 'Details'}
      </Typography>
      
      <Grid container spacing={2}>
        {fieldConfig.map((config) => (
          <Grid item xs={12} md={6} key={config.field as string}>
            <TextField
              label={config.label}
              value={(formData[config.field] as any) || ''}
              onChange={(e) => handleChange(config.field, e.target.value)}
              disabled={!isEditing}
              fullWidth
              select={config.type === 'select'}
              type={config.type || 'text'}
              SelectProps={{
                native: true,
              }}
            >
              {config.type === 'select' && config.options && config.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        ))}
      </Grid>

      {error && <Typography color="error">{error}</Typography>}

      <Box mt={2}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
