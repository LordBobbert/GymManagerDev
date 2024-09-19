// File: app/auth/login/page.tsx
"use client"; // Add this at the top to mark it as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";  // Use next/navigation instead of next/router
import LoginForm from "../../../components/auth/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: { username: string; password: string }) => {
    setError(null);  // Clear any previous errors

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
        credentials: 'include',  // Ensure cookies are included
      });

      if (response.ok) {
        router.push('/dashboard');  // Redirect on successful login
      } else {
        const responseData = await response.json();
        setError(responseData.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
