// src/hooks/useLogin.ts

import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/authApi';

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        try {
            // Attempt to log in
            await login(username, password);

            // Redirect to the admin dashboard after a successful login
            router.push('/admin/dashboard/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        }
    };

    return { handleLogin, error };
};

export default useLogin;
