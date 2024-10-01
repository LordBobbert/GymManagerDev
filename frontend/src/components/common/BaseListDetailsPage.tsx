// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, Button, Grid } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: Partial<T>) => void;  // Send partial updates
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<T>(data);
  const [modifiedData, setModifiedData] = useState<Partial<T>>({});  // Track modified fields
  const [isEditing, setIsEditing] = useState<boolean>(false);  // Track edit state

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => setNestedValue(prev, key, value));
    setModifiedData((prev) => setNestedValue(prev, key, value));  // Track changes
  };

  const handleSave = () => {
    onSave(modifiedData);  // Send only the modified data
    setIsEditing(false);  // Exit edit mode after saving
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {fieldConfig.map(({ label, key, type, options }) => {
          const value = getNestedValue(formData, key as string) || '';

          return (
            <Grid item xs={12} sm={6} key={String(key)}>
              {type === 'select' && options ? (
                <>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                    fullWidth
                    disabled={!isEditing}  // Disable selection if not editing
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <TextField
                  label={label}
                  type={type}
                  value={value}
                  onChange={(e) => handleChange(key as string, e.target.value)}
                  fullWidth
                  InputProps={{
                    readOnly: !isEditing,  // Make the field read-only when not editing
                  }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={2}>
        {isEditing ? (
          <>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BaseListDetailsPage;
