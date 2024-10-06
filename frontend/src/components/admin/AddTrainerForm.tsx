// File: src/components/admin/AddTrainerForm.tsx

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
}
from '@mui/material';
import { Trainer } from '../../interfaces/depritrainer';
import { getTrainerFieldConfig } from './../../config/fieldConfigs';  // Import the correct function
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';

interface AddTrainerFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newTrainer: Omit<Trainer, 'id'>) => Promise<void>;  // Ensure async onSubmit
    loading: boolean;
}

const AddTrainerForm: React.FC<AddTrainerFormProps> = ({ open, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState<Omit<Trainer, 'id'>>({
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
        status: 'sub_part_time',
        monthly_rate: '250',
        rent_rate_per_session: '20',
    });

    const handleChange = (key: string, value: string | number | boolean | undefined) => {
        setFormData((prev) => setNestedValue(prev, key, value));
    };

    const handleSave = () => {
        const newTrainer = {
            ...formData,
            user: {
                ...formData.user,
                id: formData.user.id ?? '',  // Ensure `id` is a string or empty string
                username: formData.user.username || '',  // Ensure `username` is always a string
            },
        };

        console.log('Submitting new trainer:', newTrainer);  // Debug: Log the new trainer data before submitting
        onSubmit(newTrainer);  // Call `onSubmit` with the new trainer data
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Trainer</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {getTrainerFieldConfig().map(({ label, key, type }: { label: string; key: string; type: string }) => {
                        const value = getNestedValue(formData, key as string) || '';  // Correct usage for retrieving nested value
                        return (
                            <TextField
                                key={String(key)}
                                label={label}
                                type={type}
                                value={value}
                                onChange={(e) => handleChange(key as string, e.target.value)}  // Update form data using setNestedValue
                            />
                        );
                    })}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}  // Disable button while loading
                >
                    {loading ? 'Saving...' : 'Save'}  {/* Show loading text */}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTrainerForm;
