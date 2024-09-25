// File: src/components/common/BaseListDetailsPage.tsx

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { FieldConfig } from '../../interfaces/FieldConfig';

interface BaseListDetailsPageProps<T> {
  data: T;
  fieldConfig: FieldConfig<T>[];
  onSave: (updatedItem: T) => void;
}

const BaseListDetailsPage = <T,>({ data, fieldConfig, onSave }: BaseListDetailsPageProps<T>) => {
  const [formData, setFormData] = useState<T>(data);

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNestedChange = (key: string, value: string | number | boolean) => {
    const keys = key.split('.');
    let updatedData: Partial<T> = { ...formData };
    let current: Partial<T> | any = updatedData;

    keys.forEach((part, index) => {
      if (index === keys.length - 1) {
        current[part] = value;
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    });

    setFormData(updatedData as T);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {fieldConfig.map(({ label, key, type }) => {
        if (typeof key === 'string' && key.includes('.')) {
          // Handle nested fields like 'user.first_name'
          const value = key.split('.').reduce((acc: any, curr: string) => acc?.[curr], formData);
          return (
            <TextField
              key={key}
              label={label}
              type={type}
              value={value || ''}
              onChange={(e) => handleNestedChange(key, e.target.value)}
            />
          );
        }

        const keyAsK = key as keyof T;
        return (
          <TextField
            key={keyAsK as string}
            label={label}
            type={type}
            value={formData[keyAsK] as string | number | ''} // Ensure value matches the type
            onChange={(e) => handleChange(keyAsK, e.target.value as T[keyof T])}
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
