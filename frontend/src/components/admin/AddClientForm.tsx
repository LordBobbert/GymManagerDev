// File: src/components/admin/AddClientForm.tsx

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import { Client } from '../../interfaces/client';
import { Trainer } from '../../interfaces/trainer'; // Import Trainer interface
import { clientFieldConfig } from '../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';
import { fetchTrainers } from '../../services/trainerService'; // Import the service for fetching trainers

interface AddClientFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newClient: Omit<Client, 'id'>) => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        user: {
            id: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            gender: undefined,
            birthday: undefined,
            roles: [],
        },
        training_status: 'active',
        personal_training_rate: 0,
        rate_type: 'one_on_one',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        trainer: undefined, // This will hold the selected trainer
    });

    const [trainers, setTrainers] = useState<Trainer[]>([]); // State to store trainers
    const [loading, setLoading] = useState<boolean>(true); // Loading state for trainers

    // Fetch the trainers when the form opens
    useEffect(() => {
        if (open) {
            setLoading(true);
            fetchTrainers()
                .then((data) => {
                    setTrainers(data);
                    setLoading(false);
                })
                .catch(() => {
                    console.error('Failed to load trainers');
                    setLoading(false);
                });
        }
    }, [open]);

    const handleChange = (key: string, value: string | number | boolean) => {
        setFormData((prev) => setNestedValue(prev, key, value));
    };

    const handleSave = () => {
        onSubmit(formData); // Call onSubmit when saving the form
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Client</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Render TextFields for other fields */}
                    {clientFieldConfig.map(({ label, key, type }) => {
                        const value = getNestedValue(formData, key as string) || ''; // Correct usage for retrieving nested value
                        return (
                            <TextField
                                key={String(key)}
                                label={label}
                                type={type}
                                value={value}
                                onChange={(e) => handleChange(key as string, e.target.value)} // Update form data using setNestedValue
                            />
                        );
                    })}

                    {/* Trainer Selection Dropdown */}
                    <FormControl fullWidth>
                        <InputLabel id="trainer-select-label">Trainer</InputLabel>
                        <Select
                            labelId="trainer-select-label"
                            id="trainer-select"
                            value={formData.trainer?.id || ''} // Use the trainer ID as the value
                            label="Trainer"
                            onChange={(e) => handleChange('trainer_id', e.target.value)} // Store the trainer's ID in the form data
                        >
                            {loading ? (
                                <MenuItem disabled>Loading trainers...</MenuItem>
                            ) : (
                                trainers.map((trainer) => (
                                    <MenuItem key={trainer.id} value={trainer.id}>
                                        {trainer.user.first_name} {trainer.user.last_name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>

                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddClientForm;
