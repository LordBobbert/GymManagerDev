// src/components/dashboard/AdminDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { User } from '../../interfaces/user'; // Assuming you have a User interface

interface AdminDashboardProps {
    user: User; // The user prop passed from getServerSideProps
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    // State for managing loading and error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulating data loading process
    useEffect(() => {
        console.log('User prop in AdminDashboard:', user); // Debug: Log user data

        // Simulate data fetching and loading state management
        if (user) {
            // Assuming user data is present
            setIsLoading(false); // Stop loading when user data is available
        } else {
            // Handle case where user data is not available
            setError('User not found');
            setIsLoading(false); // Stop loading in case of error
        }
    }, [user]);

    // Show loading spinner while data is being loaded
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Show error message if there was an error fetching data
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    // Render the actual admin dashboard content
    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Admin Dashboard, {user.first_name}!
            </Typography>
            <Grid container spacing={4}>
                {/* Example content, you can replace it with actual dashboard widgets */}
                <Grid item xs={12} md={6}>
                    <Box bgcolor="primary.main" color="white" p={2}>
                        <Typography variant="h6">Dashboard Widget 1</Typography>
                        <Typography>Some useful information here.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box bgcolor="secondary.main" color="white" p={2}>
                        <Typography variant="h6">Dashboard Widget 2</Typography>
                        <Typography>More useful information here.</Typography>
                    </Box>
                </Grid>
                {/* Add more widgets or content as needed */}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
