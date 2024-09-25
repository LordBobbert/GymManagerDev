// File: src/components/common/GenericTextField.tsx

import React from 'react';
import { TextField, Grid } from '@mui/material';

interface GenericTextFieldProps {
  label: string;
  value: string | number;
  name: string; // The key in the object to identify the field
  onChange: (name: string, value: string | number) => void; // Callback for handling changes
}

const GenericTextField: React.FC<GenericTextFieldProps> = ({ label, value, name, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={handleInputChange}
        variant="outlined"
      />
    </Grid>
  );
};

export default GenericTextField;
