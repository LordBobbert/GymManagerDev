// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];  // Configuration for fields
  onSave: (updatedItem: T) => void;  // Save handler
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<T>(data);

  const handleChange = (key: string, value: string | number | boolean | unknown) => {  // Replace 'any' with 'unknown' or specific types
    setFormData((prev) => setNestedValue(prev, key, value));
  };
  

  const handleSave = () => {
    onSave(formData);  // Call the save handler with the updated data
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fieldConfig.map(({ label, key, type, options }) => {
        const value = getNestedValue(formData, key as string) || '';  // Get value from formData

        // Render select dropdown if `type` is 'select' and options are provided
        if (type === 'select' && options) {
          return (
            <div key={String(key)}>
              <InputLabel>{label}</InputLabel>
              <Select
                value={value}
                onChange={(e) => handleChange(key as string, e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          );
        }

        // Render regular text fields
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
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default BaseListDetailsPage;
