// File: src/components/admin/AddClientForm.tsx

import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { User } from '@/interfaces/user';
import { getClientFieldConfig } from '@/config/fieldConfigs';

interface AddClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (clientData: Omit<User, 'id' | 'roles'>) => void;
  loading: boolean;
  trainers: User[]; // List of trainers fetched from server
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, loading, trainers }) => {
  const [trainerList, setTrainerList] = React.useState<User[]>([]);

  React.useEffect(() => {
    setTrainerList(trainers);
  }, [trainers]);
  const fieldConfig = getClientFieldConfig();

  const initialValues: Omit<User, 'id' | 'roles'> = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    username: '',
    gender: '',
    birthday: undefined,
    training_status: 'inactive',
    rent_rate_per_session: 0,
    emergency_contact_name: '',
    emergency_contact_phone: ''
  };

  const formik = useFormik<Omit<User, 'id' | 'roles'>>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Client</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {fieldConfig.map((field) => (
              <Grid item xs={12} sm={6} key={field.key} sx={{ mb: 2 }}>
                {field.type === 'select' ? (
                  <Box>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      fullWidth
                      name={field.key}
                      value={formik.values[field.key as keyof Omit<User, 'id' | 'roles'>] || ''}
                      onChange={(e) => formik.setFieldValue('trainer', e.target.value)}
                    >
                      <MenuItem value="">—</MenuItem>
                      {field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.key}
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={formik.values[field.key as keyof Omit<User, 'id' | 'roles'>] || ''}
                    onChange={(e) => formik.setFieldValue('trainer', e.target.value)}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12} sm={6} sx={{ mb: 6 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formik.values.username || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 6 }}>
              <InputLabel>Trainer</InputLabel>
              <Select
                fullWidth
                name="trainer"
                value={formik.values.trainer || ''}
                onChange={formik.handleChange}
              >
                <MenuItem value="">—</MenuItem>
                {trainerList.map((trainer) => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.first_name ? `${trainer.first_name} ${trainer.last_name}` : trainer.username}
                </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={formik.submitForm}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Client'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientForm;