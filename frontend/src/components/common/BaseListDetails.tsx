import React from 'react';
import { Box, Grid, Button, Card, CardContent, Typography, TextField } from '@mui/material';

interface FieldDefinition {
  label: string;
  value: string | number;
  name: string;
  type: 'text' | 'number' | 'date' | 'select'; // Add valid field types
}

interface FormData {
  [key: string]: string | number;
}

interface BaseListDetailsProps {
  fields: FieldDefinition[];
  formData: FormData;
  onFieldChange: (name: string, value: string | number) => void;
}

const BaseListDetails: React.FC<BaseListDetailsProps> = ({ fields, formData, onFieldChange }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    onFieldChange(fieldName, value);
  };

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                label={field.label}
                value={formData[field.name]}
                name={field.name}
                onChange={(e) => handleInputChange(e, field.name)} // Pass event and field name
                fullWidth
                type={field.type} // Handle different types of inputs
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save changes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BaseListDetails;
