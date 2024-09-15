// src/components/ClientProfile.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Client, ClientProfileProps } from '../../../interfaces/client';
import axiosClient from '../../../api/axiosClient';

const ClientProfile: React.FC<ClientProfileProps> = ({ client }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Client | null>(client);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
                // Prepare updatedData by finding differences between original client data and the modified formData
                const updatedData: any = {}; // Start with an empty object

                // Check for changes in user data and include them in the updatedData object
                if (client?.user?.username !== formData.user.username) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.username = formData.user.username;
                }

                if (client?.user?.email !== formData.user.email) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.email = formData.user.email;
                }

                if (client?.user?.first_name !== formData.user.first_name) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.first_name = formData.user.first_name;
                }

                if (client?.user?.last_name !== formData.user.last_name) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.last_name = formData.user.last_name;
                }

                // Check for changes in client profile data
                if (client?.training_status !== formData.training_status) {
                    updatedData.training_status = formData.training_status;
                }

                if (client?.personal_training_rate !== formData.personal_training_rate) {
                    updatedData.personal_training_rate = formData.personal_training_rate;
                }

                if (client?.rate_type !== formData.rate_type) {
                    updatedData.rate_type = formData.rate_type;
                }

                if (client?.emergency_contact_name !== formData.emergency_contact_name) {
                    updatedData.emergency_contact_name = formData.emergency_contact_name;
                }

                if (client?.emergency_contact_phone !== formData.emergency_contact_phone) {
                    updatedData.emergency_contact_phone = formData.emergency_contact_phone;
                }

                // Check if trainer has changed
                if (client?.trainer?.id !== formData.trainer?.id) {
                    updatedData.trainer_id = formData.trainer?.id;
                }

                // Only make the API call if there are changes
                if (Object.keys(updatedData).length > 0) {
                    const url = `/api/clients/${formData.id}/`;

                    // Use PATCH method for partial updates
                    const response = await axiosClient.patch(url, updatedData); // Change here to PATCH
                    setFormData(response.data); // Update formData with the latest server data
                    setEditMode(false);
                } else {
                    // No changes detected, just exit edit mode
                    setEditMode(false);
                }
            }
        } catch (error: any) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                setErrors(error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
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
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={formData?.user?.last_name || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formData?.user?.email || ''}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Username"
                                name="username"
                                value={formData?.user?.username || ''}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Phone Number"
                                name="phone_number"
                                value={formData?.user?.phone_number || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Gender"
                                name="gender"
                                value={formData?.user?.gender || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Birthday"
                                name="birthday"
                                value={formData?.user?.birthday || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        {/* Client Profile Information */}
                        <Grid item xs={6}>
                            <TextField
                                label="Training Status"
                                name="training_status"
                                value={formData?.training_status || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Personal Training Rate"
                                name="personal_training_rate"
                                value={formData?.personal_training_rate || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Rate Type"
                                name="rate_type"
                                value={formData?.rate_type || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Emergency Contact Name"
                                name="emergency_contact_name"
                                value={formData?.emergency_contact_name || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Emergency Contact Phone"
                                name="emergency_contact_phone"
                                value={formData?.emergency_contact_phone || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </>
                ) : (
                    <>
                        {/* Display User Information */}
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>First Name:</strong> {formData?.user?.first_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Last Name:</strong> {formData?.user?.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {formData?.user?.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Username:</strong> {formData?.user?.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Phone Number:</strong> {formData?.user?.phone_number}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Gender:</strong> {formData?.user?.gender}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Birthday:</strong> {formData?.user?.birthday}
                            </Typography>
                        </Grid>

                        {/* Display Client Profile Information */}
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Training Status:</strong> {formData?.training_status}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Personal Training Rate:</strong> {formData?.personal_training_rate}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Rate Type:</strong> {formData?.rate_type}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Emergency Contact Name:</strong> {formData?.emergency_contact_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Emergency Contact Phone:</strong> {formData?.emergency_contact_phone}
                            </Typography>
                        </Grid>
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
