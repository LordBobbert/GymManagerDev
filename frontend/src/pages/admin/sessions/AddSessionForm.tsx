// src/components/session/AddSessionForm.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent
import axiosClient from '../../../api/axiosClient';
import { Client } from '../../../interfaces/client';
import { Trainer } from '../../../interfaces/trainer';

interface AddSessionFormProps {
    onSessionAdded: () => void; // Callback to update the session list after adding a session
}

const AddSessionForm: React.FC<AddSessionFormProps> = ({ onSessionAdded }) => {
    const [formData, setFormData] = useState({
        client_id: '',
        trainer_id: '',
        session_type: 'one_on_one',
        date: '',
        notes: '',
    });

    const [clients, setClients] = useState<Client[]>([]);
    const [trainers, setTrainers] = useState<Trainer[]>([]);

    useEffect(() => {
        // Fetch clients
        axiosClient.get<Client[]>('/api/clients/').then((response) => {
            setClients(response.data);
        });

        // Fetch trainers
        axiosClient.get<Trainer[]>('/api/trainers/').then((response) => {
            setTrainers(response.data);
        });
    }, []);

    // Adjusted handleChange function
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosClient.post('/api/sessions/', formData);
            onSessionAdded(); // Notify the parent component to refresh the session list
        } catch (error) {
            console.error('Error adding session', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Add New Session</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="client-label">Client</InputLabel>
                    <Select
                        labelId="client-label"
                        name="client_id"
                        value={formData.client_id}
                        onChange={handleChange}
                    >
                        {clients.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {`${client.user.first_name} ${client.user.last_name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="trainer-label">Trainer</InputLabel>
                    <Select
                        labelId="trainer-label"
                        name="trainer_id"
                        value={formData.trainer_id}
                        onChange={handleChange}
                    >
                        {trainers.map((trainer) => (
                            <MenuItem key={trainer.id} value={trainer.id}>
                                {`${trainer.user.first_name} ${trainer.user.last_name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="session-type-label">Session Type</InputLabel>
                    <Select
                        labelId="session-type-label"
                        name="session_type"
                        value={formData.session_type}
                        onChange={handleChange}
                    >
                        <MenuItem value="one_on_one">One on One</MenuItem>
                        <MenuItem value="group">Group</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Date"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Session
                </Button>
            </form>
        </Box>
    );
};

export default AddSessionForm;
