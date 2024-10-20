// File: src/components/common/FieldRenderer.tsx

import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { FieldConfig } from '@/interfaces/FieldConfig';

interface FieldRendererProps<T> {
  field: FieldConfig<T>;
  value: string | number;
  onChange: (key: keyof T, value: string | number) => void;
}

export const FieldRenderer = <T,>({ field, value, onChange }: FieldRendererProps<T>) => {
  if (field.type === 'select') {
    return (
      <>
        <InputLabel>{field.label}</InputLabel>
        <Select value={value} onChange={(e) => onChange(field.key as keyof T, e.target.value)}>
          {field.options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  }

  return (
    <TextField
      label={field.label}
      value={value}
      onChange={(e) => onChange(field.key as keyof T, e.target.value)}
      type={field.type}
    />
  );
};
