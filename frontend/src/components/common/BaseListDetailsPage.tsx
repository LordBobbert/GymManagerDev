// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';
import { getNestedValue, setNestedValue } from '../../utils/nestedUtils';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: T) => void;
}

const BaseListDetailsPage = <T,>({
  data,
  fieldConfig,
  onSave,
}: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<T>(data);

  const handleChange = (key: string, value: string | number | boolean) => {
    setFormData((prev) => setNestedValue(prev, key, value));
  };

  const handleSave = () => {
    onSave(formData); // Save the updated item
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fieldConfig.map(({ label, key, type }) => {
        const value = getNestedValue(formData, key as string) || ''; // Cast `key` to string
        return (
          <TextField
            key={String(key)} // Cast key to string for the 'key' prop
            label={label}
            type={type}
            value={value}
            onChange={(e) => handleChange(key as string, e.target.value)} // Ensure `key` is treated as string
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
