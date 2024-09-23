// File: src/app/auth/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/auth/LoginForm";
import { Container, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: { username: string; password: string }) => {
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-management/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        const roles = result.user.roles;

        if (roles.includes('admin')) {
          router.push('/admin/dashboard');
        } else if (roles.includes('trainer')) {
          router.push('/trainer/dashboard');
        } else {
          setError("You don't have the required permissions.");
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Typography component="p" variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
          Enter your credentials below to access your account.
        </Typography>
        <LoginForm onSubmit={handleLogin} error={error} />
      </Box>
    </Container>
  );
};

export default LoginPage;
