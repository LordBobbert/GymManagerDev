// src/pages/admin/clients/AddClientForm.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axiosClient from '../../services/axiosClient';
import { Client } from '../../interfaces/client';
import { SelectChangeEvent } from '@mui/material';

interface AddClientFormProps {
    onClientAdded: (newClient: Client) => void; // Callback to call when a client is added
}

const AddClientForm: React.FC<AddClientFormProps> = ({ onClientAdded }) => {
    // Initial form state including User and ClientProfile fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        trainingStatus: 'active',
        personalTrainingRate: '',
        rateType: 'one_on_one',
        trainer: '', // Store trainer ID here
        emergencyContactName: '',
        emergencyContactPhone: '',
    });

    const [trainers, setTrainers] = useState<{ id: number; username: string; first_name: string; last_name: string }[]>([]);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axiosClient.get('/api/users/trainers/');
                setTrainers(response.data);
            } catch (error) {
                console.error('Error fetching trainers', error);
            }
        };

        fetchTrainers();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target as HTMLInputElement; // Type assertion to avoid type errors
    
        setFormData({
            ...formData,
            [name]: value as string,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Update the request data structure to match the backend requirements
            const requestData = {
                user: {
                    username: formData.username,
                    email: formData.email,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_number: formData.phoneNumber,
                    gender: formData.gender,
                    birthday: formData.birthday,
                },
                training_status: formData.trainingStatus,
                personal_training_rate: formData.personalTrainingRate,
                rate_type: formData.rateType,
                trainer: formData.trainer ? parseInt(formData.trainer) : null, // Use the trainer ID here
                emergency_contact_name: formData.emergencyContactName,
                emergency_contact_phone: formData.emergencyContactPhone,
            };

            const response = await axiosClient.post<Client>('/api/clients/', requestData);
            onClientAdded(response.data); // Call the callback to update the client list
        } catch (error) {
            console.error('Error adding client', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Add New Client</Typography>
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
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    select
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                    label="Birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                />

                {/* ClientProfile Fields */}
                <TextField
                    label="Training Status"
                    name="trainingStatus"
                    value={formData.trainingStatus}
                    onChange={handleChange}
                    select
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="vacation">Vacation</MenuItem>
                </TextField>
                <TextField
                    label="Personal Training Rate"
                    name="personalTrainingRate"
                    value={formData.personalTrainingRate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Rate Type"
                    name="rateType"
                    value={formData.rateType}
                    onChange={handleChange}
                    select
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="one_on_one">One on One</MenuItem>
                    <MenuItem value="partner">Partner</MenuItem>
                </TextField>

                {/* Trainer Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="trainer-label">Trainer</InputLabel>
                    <Select
                        labelId="trainer-label"
                        name="trainer"
                        value={formData.trainer}
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {trainers.map((trainer) => (
                            <MenuItem key={trainer.id} value={trainer.id.toString()}> {/* Use the trainer ID */}
                                {trainer.first_name} {trainer.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Emergency Contact Name"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Emergency Contact Phone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
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
                    Add Client
                </Button>
            </form>
        </Box>
    );
};

export default AddClientForm;
