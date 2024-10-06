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
        monthly_rate: 250,  // Type as number
        rent_rate_per_session: 20,  // Type as number
    });

    // Update typing to avoid 'any'
    const handleChange = <K extends keyof Omit<User, 'id'>>(key: K, value: User[K]) => {
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
                        const typedKey = key as keyof Omit<User, 'id'>;  // Use more specific typing
                        const value = getNestedValue(formData, typedKey) || '';  // Type-safe access
                        return (
                            <TextField
                                key={String(key)}
                                label={label}
                                type={type}
                                value={String(value)}  // Ensure value is converted to string
                                onChange={(e) => handleChange(typedKey, e.target.value as any)}
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
