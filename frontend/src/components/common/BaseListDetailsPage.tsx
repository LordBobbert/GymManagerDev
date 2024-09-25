// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';

interface BaseListDetailsPageProps<T> {
  data: T[]; // Array of data (Client, Trainer, or Session)
  fieldConfig: FieldConfig<T>[]; // Field configuration for generating form inputs dynamically
  section: 'clients' | 'trainers' | 'sessions'; // Section to determine heading and form behavior
  onSave: (updatedItem: T) => void; // Function to handle saving updates
  renderList: () => React.ReactNode; // Custom list renderer
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  section,
  onSave,
  renderList,
}: BaseListDetailsPageProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [formValues, setFormValues] = useState<Partial<T>>({});

  const handleFieldChange = (key: keyof T | string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value as T[keyof T], // Adjusted type
    }));
  };

  const handleSave = () => {
    if (selectedItem) {
      onSave({ ...selectedItem, ...formValues });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {/* Render the list of items */}
        {renderList()}
      </Grid>
      <Grid item xs={9}>
        {selectedItem ? (
          <Box>
            <Typography variant="h6">
              {section.charAt(0).toUpperCase() + section.slice(1)} Details
            </Typography>

            {/* Render form fields based on the fieldConfig */}
            {fieldConfig.map((field) => (
              <TextField
                key={field.key as string}
                label={field.label}
                value={(selectedItem as any)[field.key] || ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                type={field.type}
                fullWidth
                margin="normal"
                disabled={!field.editable} // Disable the field if not editable
              />
            ))}

            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">Select an item to view details.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default BaseListDetailsPage;
