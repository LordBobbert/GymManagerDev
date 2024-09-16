// src/pages/admin/trainers/TrainerProfile.tsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Trainer, TrainerProfileProps } from '../../../interfaces/trainer';
import axiosClient from '../../../api/axiosClient';

const TrainerProfile: React.FC<TrainerProfileProps> = ({ trainer }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Trainer | null>(trainer);

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

    // Inside your component or function
// ... other imports and code ...

// Inside your component or function
const handleSave = async () => {
    try {
        if (formData && formData.id) {
            // Prepare updatedData by finding differences between original trainer data and the modified formData
            const updatedData: Partial<Trainer> = {}; // Use Partial<Trainer> to allow for partial updates

            // Ensure that `updatedData.user` is initialized as an object of type Partial<User> before accessing its properties
            updatedData.user = updatedData.user || {
                id: formData.user.id ?? 0, // Provide a default value (0) if `id` is undefined
                username: formData.user.username, // Assuming `formData.user.username` is available
                email: formData.user.email,       // Assuming `formData.user.email` is available
                first_name: formData.user.first_name, // Assuming `formData.user.first_name` is available
                last_name: formData.user.last_name,   // Assuming `formData.user.last_name` is available
                role: formData.user.role // Assuming `formData.user.role` is available
            };

            // Check for changes in user data and include them in the updatedData object
            if (trainer?.user?.username !== formData.user.username) {
                updatedData.user.username = formData.user.username;
            }

            if (trainer?.user?.email !== formData.user.email) {
                updatedData.user.email = formData.user.email;
            }

            if (trainer?.user?.first_name !== formData.user.first_name) {
                updatedData.user.first_name = formData.user.first_name;
            }

            if (trainer?.user?.last_name !== formData.user.last_name) {
                updatedData.user.last_name = formData.user.last_name;
            }

            // Only set `id` if it actually exists in `formData.user`
            if (formData.user.id !== undefined) {
                updatedData.user.id = formData.user.id;
            }

            // Check for changes in other trainer-specific profile data
            if (trainer?.status !== formData.status) {
                updatedData.status = formData.status;
            }

            if (trainer?.monthly_rate !== formData.monthly_rate) {
                updatedData.monthly_rate = formData.monthly_rate;
            }

            if (trainer?.rent_rate_per_session !== formData.rent_rate_per_session) {
                updatedData.rent_rate_per_session = formData.rent_rate_per_session;
            }

            // Check if changes exist before making the API call
            if (Object.keys(updatedData).length > 0) {
                const url = `/api/trainers/${formData.id}/`;

                // Use PATCH method for partial updates
                const response = await axiosClient.patch(url, updatedData); // Change here to PATCH
                setFormData(response.data); // Update formData with the latest server data
                setEditMode(false);
            } else {
                // No changes detected, just exit edit mode
                setEditMode(false);
            }
        }
    } catch (error: unknown) { // Replaced `any` with `unknown`
        if (error instanceof Error) { // Type guard for error
            console.error('Error:', error.message);
        }
    }
};





// ... rest of the file ...



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
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Username"
                                name="username"
                                value={formData?.user?.username || ''}
                                onChange={handleChange}
                                fullWidth
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

                        {/* Trainer Profile Information */}
                        <Grid item xs={6}>
                            <TextField
                                label="Status"
                                name="status"
                                value={formData?.status || ''}
                                onChange={handleChange}
                                fullWidth
                            />
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
