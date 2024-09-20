"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import next/navigation for routing
import LoginForm from "../../../components/auth/LoginForm";
import { Container, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: { username: string; password: string }) => {
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: 'include',  // Ensure cookies are sent/received properly
      });

      const result = await response.json();

      if (response.ok) {
        // Check if the user has the admin role
        const isAdmin = result.user.roles.includes("admin");

        if (isAdmin) {
          // Redirect to admin dashboard
          router.push('/admin/dashboard');
        } else {
          // Handle non-admin users, e.g., show a message or redirect to a different page
          setError("You don't have admin access.");
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
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Typography component="p" variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
          Enter your credentials below to access your account.
        </Typography>
        <LoginForm onSubmit={handleLogin} error={error} />
      </Box>
    </Container>
  );
};

export default LoginPage;
