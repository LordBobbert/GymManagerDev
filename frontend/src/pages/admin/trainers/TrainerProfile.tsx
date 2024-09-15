// src/components/TrainerProfile.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Trainer } from '../../../interfaces/trainer';
import axiosClient from '../../../api/axiosClient';

interface TrainerProfileProps {
    trainer: Trainer | null;
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainer }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Trainer | null>(trainer);
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
                } as Trainer;
            } else {
                return {
                    ...prevState,
                    [name]: value,
                } as Trainer;
            }
        });
    };

    const handleSave = async () => {
        try {
            if (formData && formData.id) {
                const updatedData: any = {}; // Start with an empty object

                // Check for changes in user data and include them in the updatedData object
                if (trainer?.user?.username !== formData.user.username) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.username = formData.user.username;
                }

                if (trainer?.user?.email !== formData.user.email) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.email = formData.user.email;
                }

                if (trainer?.user?.first_name !== formData.user.first_name) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.first_name = formData.user.first_name;
                }

                if (trainer?.user?.last_name !== formData.user.last_name) {
                    updatedData.user = updatedData.user || {};
                    updatedData.user.last_name = formData.user.last_name;
                }

                // Check for changes in trainer profile data
                if (trainer?.status !== formData.status) {
                    updatedData.status = formData.status;
                }

                if (trainer?.monthly_rate !== formData.monthly_rate) {
                    updatedData.monthly_rate = formData.monthly_rate;
                }

                if (trainer?.rent_rate_per_session !== formData.rent_rate_per_session) {
                    updatedData.rent_rate_per_session = formData.rent_rate_per_session;
                }

                // Only make the API call if there are changes
                if (Object.keys(updatedData).length > 0) {
                    const url = `/api/trainers/${formData.id}/`;

                    // Use PATCH method for partial updates
                    const response = await axiosClient.patch(url, updatedData);
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

    // Populate formData with selected trainer data
    useEffect(() => {
        if (trainer) {
            setFormData(trainer);
        }
    }, [trainer]);

    return (
        <Box>
            <Typography variant="h5">Trainer Profile Details</Typography>
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

                        {/* Trainer Profile Information */}
                        <Grid item xs={6}>
                            <TextField
                                label="Status"
                                name="status"
                                value={formData?.status || ''}
                                onChange={handleChange}
                                select
                                fullWidth
                            >
                                <option value="sub_part_time">Sub Part Time</option>
                                <option value="sub_full_time">Sub Full Time</option>
                                <option value="emp_part_time">Emp Part Time</option>
                                <option value="emp_full_time">Emp Full Time</option>
                                <option value="inactive">Inactive</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Monthly Rate"
                                name="monthly_rate"
                                value={formData?.monthly_rate || ''}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Rent Rate Per Session"
                                name="rent_rate_per_session"
                                value={formData?.rent_rate_per_session || ''}
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

                        {/* Display Trainer Profile Information */}
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Status:</strong> {formData?.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Monthly Rate:</strong> {formData?.monthly_rate}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Rent Rate Per Session:</strong> {formData?.rent_rate_per_session}
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

export default TrainerProfile;
