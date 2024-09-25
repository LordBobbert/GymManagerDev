"use client";

// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid } from '@mui/material';

interface FieldConfig<T> {
  label: string;
  key: keyof T; // Type-safe key based on the generic type T
  type?: string; // Optional type for fields like 'number', 'text', etc.
}

interface BaseListDetailsPageProps<T> {
  data: T | null; // The selected item for details
  fieldConfig: FieldConfig<T>[]; // Dynamic field configuration
  section: string; // Section to define whether it's clients, trainers, etc.
  onSave: (updatedItem: T) => void; // Save handler
  renderList: () => React.ReactNode; // Function to render the list
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  section,
  onSave,
  renderList,
}: BaseListDetailsPageProps<T>) => {
  const [editedItem, setEditedItem] = useState<T | null>(data); // Local state for editing

  const handleInputChange = (key: keyof T, value: any) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [key]: value });
    }
  };

  const handleSaveClick = () => {
    if (editedItem) {
      onSave(editedItem);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* List section */}
      <Box sx={{ width: '25%', paddingRight: '20px', borderRight: '1px solid #ccc' }}>
        {renderList()} {/* Render the list */}
      </Box>

      {/* Details section */}
      <Box sx={{ width: '75%', paddingLeft: '20px' }}>
        {data ? (
          <>
            <Typography variant="h6">{`Edit ${section.slice(0, -1)}`}</Typography>
            <Grid container spacing={2}>
              {fieldConfig.map((field) => (
                <Grid item xs={6} key={String(field.key)}>
                  <TextField
                    fullWidth
                    label={field.label}
                    value={data[field.key] as string | number | undefined}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    type={field.type || 'text'}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              sx={{ marginTop: '20px' }}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <Typography variant="h6">Select a {section.slice(0, -1)} to view details</Typography>
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
