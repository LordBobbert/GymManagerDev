// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel } from '@mui/material';
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

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => setNestedValue(prev, key, value));
    setModifiedData((prev) => setNestedValue(prev, key, value));  // Track changes
  };

  const handleSave = () => {
    onSave(modifiedData);  // Send only the modified data
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fieldConfig.map(({ label, key, type, options }) => {
        const value = getNestedValue(formData, key as string) || '';

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
