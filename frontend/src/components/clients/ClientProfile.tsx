// src/pages/admin/clients/ClientProfile.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Client, ClientProfileProps } from '../../interfaces/client';
import { updateClient } from '../../services/clientApi'; // Make sure to use the new `updateClient` function from clientApi

const ClientProfile: React.FC<ClientProfileProps> = ({ client, onClientUpdated }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Client | null>(client);

    // Toggle between edit and view mode
    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => {
            if (!prevState) return null;

            if (name in prevState.user) {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        [name]: value,
                    },
                } as Client;
            } else {
                return {
                    ...prevState,
                    [name]: value,
                } as Client;
            }
        });
    };

    const handleSave = async () => {
        try {
            if (formData && formData.id) {
                // Use the `updateClient` function from `clientApi.ts`
                const updatedClient = await updateClient(formData.id, formData);
                onClientUpdated(updatedClient); // Notify parent component with the updated client
                setEditMode(false);
            }
        } catch (error: unknown) { // Replaced `any` with `unknown`
            if (error instanceof Error) { // Type guard for error
                console.error('Error:', error.message);
            }
        }
    };

    // Populate formData with selected client data
    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

    return (
        <Box>
            <Typography variant="h5">Profile Details</Typography>
            <Grid container spacing={2}>
                {editMode ? (
                    <>
                        {/* User Information */}
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={formData?.user?.first_name || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        {/* Repeat other fields... */}
                    </>
                ) : (
                    <>
                        {/* Display User Information */}
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>First Name:</strong> {formData?.user?.first_name}
                            </Typography>
                        </Grid>
                        {/* Repeat other fields... */}
                    </>
                )}
            </Grid>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                >
                    {editMode ? 'Cancel' : 'Edit'}
                </Button>
                {editMode && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ClientProfile;
