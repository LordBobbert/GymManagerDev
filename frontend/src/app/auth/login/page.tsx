// src/app/auth/login/page.tsx

import { Box, Typography } from '@mui/material';
import LoginForm from '../../../components/auth/LoginForm';
import useLogin from '../../../hooks/useLogin';

export default function LoginPage() {
    const { handleLogin, error } = useLogin();

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
            <LoginForm onLogin={handleLogin} error={error} />
        </Box>
    );
}
