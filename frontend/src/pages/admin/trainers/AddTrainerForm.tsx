// src/pages/admin/trainers/AddTrainerForm.tsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axiosClient from '../../../api/axiosClient';
import { Trainer } from '../../../interfaces/trainer';

interface AddTrainerFormProps {
    onTrainerAdded: () => void; // Callback to call when a trainer is added
}

const AddTrainerForm: React.FC<AddTrainerFormProps> = ({ onTrainerAdded }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        status: 'sub_part_time',
        monthlyRate: '',
        rentRatePerSession: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const requestData = {
                user: {
                    username: formData.username,
                    email: formData.email,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                },
                status: formData.status,
                monthlyRate: formData.monthlyRate,
                rentRatePerSession: formData.rentRatePerSession,
            };

            await axiosClient.post<Trainer>('/api/trainers/', requestData);
            onTrainerAdded(); // Call the callback to update the trainer list
        } catch (error) {
            console.error('Error adding trainer', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Add New Trainer</Typography>
            <form onSubmit={handleSubmit}>
                {/* User Fields */}
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                {/* TrainerProfile Fields */}
                <TextField
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    select
                    fullWidth
                    margin="normal"
                >
                    <option value="sub_part_time">Sub Part Time</option>
                    <option value="sub_full_time">Sub Full Time</option>
                    <option value="emp_part_time">Emp Part Time</option>
                    <option value="emp_full_time">Emp Full Time</option>
                    <option value="inactive">Inactive</option>
                </TextField>
                <TextField
                    label="Monthly Rate"
                    name="monthlyRate"
                    value={formData.monthlyRate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Rent Rate Per Session"
                    name="rentRatePerSession"
                    value={formData.rentRatePerSession}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Add Trainer
                </Button>
            </form>
        </Box>
    );
};

export default AddTrainerForm;
