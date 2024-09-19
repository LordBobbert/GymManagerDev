// File: app/auth/login/page.tsx
"use client"; // This marks the file as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/auth/LoginForm";
import './login.module.css'; // Import the CSS module for styling

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: { username: string; password: string }) => {
    setError(null);  // Clear any previous errors

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
    <div className="login-page-container">
      <h1 className="login-title">Login</h1>
      <p className="login-description">Enter your credentials below to access your account.</p>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
