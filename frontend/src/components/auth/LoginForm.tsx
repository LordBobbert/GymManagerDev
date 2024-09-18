// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
    error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} width="300px">
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
            {error && (
                <Typography variant="body2" color="error" mb={2}>
                    {error}
                </Typography>
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Log In
            </Button>
        </Box>
    );
};

export default LoginForm;
