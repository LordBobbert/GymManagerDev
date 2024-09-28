// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel, Typography } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Details
      </Typography>

      {fieldConfig.map(({ label, key, type, options }) => {
        // Explicitly cast the value to React.ReactNode to satisfy TypeScript
        let value: React.ReactNode = getNestedValue(formData, key as string) as React.ReactNode;

        // Ensure value is valid before rendering
        if (typeof value === 'object' && value !== null) {
          value = JSON.stringify(value);  // Convert object to string for display
        } else if (value == null || value === '') {
          value = 'N/A';  // Handle null or empty values
        }

        return !isEditing ? (
          <Box key={String(key)} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{label}</Typography>
            <Typography variant="body1">{String(value)}</Typography>  {/* Valid ReactNode */}
          </Box>
        ) : (
          <div key={String(key)}>
            {type === 'select' && options ? (
              <>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={value}
                  onChange={(e) => handleChange(key as string, e.target.value)}
                  fullWidth
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
              />
            )}
          </div>
        );
      })}

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
