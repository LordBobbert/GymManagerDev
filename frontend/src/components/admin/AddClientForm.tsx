// File: src/components/admin/AddClientForm.tsx

import React, { useState } from 'react';
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
    CircularProgress,
} from '@mui/material';
import { Client } from '../../interfaces/client';
import { Trainer } from '../../interfaces/trainer';
import { clientFieldConfig } from '../../config/fieldConfigs';
import { setNestedValue, getNestedValue } from '../../utils/nestedUtils';

interface AddClientFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newClient: Omit<Client, 'id'>) => Promise<void>; // Ensure async onSubmit
    trainers: Trainer[];
    loading: boolean;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ open, onClose, onSubmit, trainers, loading }) => {
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
        trainer: undefined,
    });

    const handleChange = (key: string, value: string | number | boolean | Trainer | undefined) => {
        setFormData((prev) => setNestedValue(prev, key, value));
    };

    const handleSave = () => {
        const newClient = {
            ...formData,
            trainer_id: formData.trainer?.id || undefined,  // Ensure trainer_id is either a number or undefined
            user: {
                ...formData.user,
                id: formData.user.id ?? '',  // Ensure id is either a string or an empty string
                username: formData.user.username || ''  // Ensure username is always a string
            }
        };
    
        onSubmit(newClient);  // Call onSubmit with the new client data
    };
    
    
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Client</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

                    {/* Trainer Dropdown */}
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            <InputLabel>Trainer</InputLabel>
                            <Select
                                value={formData.trainer?.id || ''} // Use the trainer's id or empty string
                                onChange={(e) => {
                                    const selectedTrainer = trainers.find((trainer) => trainer.id === Number(e.target.value)); // Convert e.target.value to a number
                                    handleChange('trainer', selectedTrainer || undefined); // Set the selected trainer object or undefined
                                }}
                            >
                                <MenuItem value="">None</MenuItem>
                                {trainers.map((trainer) => (
                                    <MenuItem key={trainer.id} value={trainer.id.toString()}> {/* Convert trainer.id to string */}
                                        {trainer.user.first_name} {trainer.user.last_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    )}
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

export default AddClientForm;
