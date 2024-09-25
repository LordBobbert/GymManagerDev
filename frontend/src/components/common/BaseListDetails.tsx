// File: src/components/common/BaseListDetails.tsx

import React from 'react';
import { Box, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import GenericTextField from './GenericTextField';

interface FieldDefinition {
  label: string;
  value: string | number;
  name: string;
}

interface BaseListDetailsProps {
  fields: FieldDefinition[]; // Array of field definitions
  onFieldChange: (name: string, value: string | number) => void;
}

const BaseListDetails: React.FC<BaseListDetailsProps> = ({ fields, onFieldChange }) => {
  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>

        <Grid container spacing={2}>
          {fields.map((field) => (
            <GenericTextField
              key={field.name}
              label={field.label}
              value={field.value}
              name={field.name}
              onChange={onFieldChange}
            />
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
