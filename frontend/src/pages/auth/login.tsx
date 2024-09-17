// src/pages/auth/login.tsx
// src/pages/auth/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../api/authApi'; // Import the login function
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // Attempt to log in
            await login(username, password);

            // Redirect to the admin dashboard after a successful login
            router.push('/admin');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Typography variant="h4" mb={4}>
                Admin Login
            </Typography>
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} width="300px">
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
        </Box>
    );
};

export default LoginPage;
