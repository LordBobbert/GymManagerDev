import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button, Paper } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: Partial<T>) => void;  // Send partial updates
}

const BaseListDetailsPage = <T,>({ data, fieldConfig, onSave }: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(data);  // Set initial state as Partial<T>
  const [modifiedData, setModifiedData] = useState<Partial<T>>({});  // Track modified fields
  const [isEditing, setIsEditing] = useState<boolean>(false);  // Track edit state

  useEffect(() => {
    setFormData(data);  // Ensure formData is updated when data changes
  }, [data]);

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => setNestedValue({ ...prev }, key, value));  // Update formData state
    setModifiedData((prev) => setNestedValue({ ...prev }, key, value));  // Track modified data
  };

  const handleSave = () => {
    if (Object.keys(modifiedData).length > 0) {
      onSave(modifiedData);  // Send only modified data
      setIsEditing(false);  // Exit edit mode after saving
      setModifiedData({});  // Clear modified data after save
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginLeft: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        {fieldConfig.map(({ label, key, type, options }) => {
          const value = getNestedValue(formData || {}, key as string) || '';  // Safely access nested values

          return (
            <Grid item xs={12} sm={6} key={String(key)}>
              {type === 'select' && options ? (
                <FormControl fullWidth>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    label={label}
                    value={value}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                    disabled={!isEditing}
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
