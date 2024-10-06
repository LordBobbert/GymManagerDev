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
} from '@mui/material';
import { User } from '../../interfaces/user';  // Use User interface for typing
import { getTrainerFieldConfig } from './../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';

interface AddTrainerFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newTrainer: Omit<User, 'id'>) => Promise<void>;
    loading: boolean;
}

const AddTrainerForm: React.FC<AddTrainerFormProps> = ({ open, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState<Omit<User, 'id'>>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        gender: undefined,
        birthday: undefined,
        roles: ['trainer'],  // Predefined 'trainer' role
        status: 'sub_part_time',
        monthly_rate: 250,  // Ensure these are numbers
        rent_rate_per_session: 20,  // Ensure these are numbers
    });

    // Remove over-complicated generics and just strongly type the fields
    const handleChange = (key: keyof Omit<User, 'id'>, value: string | number | boolean | undefined) => {
        setFormData((prev) => setNestedValue(prev, key, value));
    };

    const handleSave = () => {
        const newTrainer = {
            ...formData,
            username: formData.username || '',
        };
        onSubmit(newTrainer);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Trainer</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {getTrainerFieldConfig().map(({ label, key, type }) => {
                        const typedKey = key as keyof Omit<User, 'id'>;  // Safely cast key
                        const value = getNestedValue(formData, typedKey) || '';  // Safely retrieve value

                        return (
                            <TextField
                                key={String(key)}
                                label={label}
                                type={type}
                                value={String(value)}  // Ensure value is a string
                                onChange={(e) => {
                                    const inputValue = type === 'number' ? Number(e.target.value) : e.target.value;
                                    handleChange(typedKey, inputValue);
                                }}
                                fullWidth
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
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTrainerForm;
