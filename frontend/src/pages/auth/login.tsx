// src/pages/auth/login.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import axiosClient from '../../api/axiosClient'; // Ensure axiosClient is set up with 'withCredentials'
import { setCookie } from 'nookies'; // Import nookies to set cookies

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Handle login logic
    const handleLogin = async () => {
        try {
            const response = await axiosClient.post('/api/auth/login/', {
                username,
                password,
            });

            // Extract the token from the response (assuming JWT is sent in response)
            const accessToken = response.data.access_token;

            // Set the token as an HTTP-only cookie using nookies
            setCookie(null, 'access_token', accessToken, {
                path: '/',
                maxAge: 30 * 24 * 60 * 60, // 30 days
                httpOnly: true, // Make it HTTP-only
                secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            });

            // Assuming response.data.user.roles contains the user's roles
            const userRoles = response.data.user.roles;

            // Redirect based on user roles, adjust the paths based on your setup
            if (userRoles.includes('admin')) {
                router.push('/admin');
            } else {
                router.push('/dashboard'); // Adjust the path as needed
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid username or password'); // Display error message
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h4" mb={2}>Login</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
