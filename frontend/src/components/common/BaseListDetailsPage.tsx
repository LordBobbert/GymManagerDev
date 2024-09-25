// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedData: T) => void;
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((o, i) => (o ? o[i] : ''), obj);
}

function setNestedValue(obj: any, path: string, value: any) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const deep = keys.reduce((o, key) => o[key] = o[key] || {}, obj);
  deep[lastKey!] = value;
}

const BaseListDetailsPage = <T,>({ data, fieldConfig, onSave }: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<T>({ ...data });

  const handleChange = (key: string, value: any) => {
    const updatedData = { ...formData };
    setNestedValue(updatedData, key, value);
    setFormData(updatedData);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box>
      {/* Render form fields based on fieldConfig */}
      {fieldConfig.map(({ label, key, type, options }) => (
        <Box key={key.toString()} sx={{ mb: 2 }}>
          {type === 'select' && options ? (
            <TextField
              select
              label={label}
              value={getNestedValue(formData, key.toString())}
              onChange={(e) => handleChange(key.toString(), e.target.value)}
              fullWidth
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={label}
              value={getNestedValue(formData, key.toString())}
              onChange={(e) => handleChange(key.toString(), e.target.value)}
              type={type}
              fullWidth
            />
          )}
        </Box>
      ))}

      <button onClick={handleSave}>Save</button>
    </Box>
  );
};

export default BaseListDetailsPage;
