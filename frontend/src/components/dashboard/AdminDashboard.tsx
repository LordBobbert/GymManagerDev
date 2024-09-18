// src/components/dashboard/AdminDashboard.tsx

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { User } from '../../interfaces/user'; // Assuming you have a User interface

interface AdminDashboardProps {
    user: User | null; // Allow user to be of type User or null
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    // Check if user prop is valid
    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">
                    User not found or unauthorized
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
