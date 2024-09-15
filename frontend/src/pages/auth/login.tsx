// src/pages/auth/login.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter for navigation
import axiosClient from '../../api/axiosClient';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Card, Link } from '@mui/material';
import { useRoleRedirect } from '../../hooks/useRoleRedirect'; // Import the custom hook

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [roles, setRoles] = useState<string[]>([]); // Track the user's roles

    // Call the hook to redirect based on roles
    useRoleRedirect(roles);

    const handleLogin = async () => {
        try {
            const response = await axiosClient.post('/api/auth/login/', {
                username,
                password,
            });

            // Assuming response.data.user.roles contains the user's roles
            const userRoles = response.data.user.roles;

            // Set the roles which triggers useRoleRedirect
            setRoles(userRoles);

        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid username or password');  // Display error message
        }
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <img src="/images/Gym+Logo+copy.png" alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </Box>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Unified Health and Fitness
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <FormControlLabel
                        control={<Checkbox name="remember" color="primary" />}
                        label="Remember Me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Link href="/auth/register" variant="body2">Create an Account</Link>
                    <Link href="/auth/forgot-password" variant="body2">Forgot Password?</Link>
                </Box>
            </Card>
        </Box>
    );
};

export default LoginPage;
