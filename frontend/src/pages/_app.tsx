// src/pages/_app.tsx

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layout/DashboardLayout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import axiosClient from '../api/axiosClient'; // Assuming you have a global axios instance
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Determine if the current route is an admin route
    const isAdminRoute = router.pathname.startsWith('/admin');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Example: Check if the user is authenticated
                const response = await axiosClient.get('/api/auth/check-auth');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Not authenticated', error);
                setIsAuthenticated(false);
                // Optionally, redirect to login
                if (isAdminRoute) {
                    router.push('/auth/login');
                }
            }
        };

        // Only check authentication for admin routes
        if (isAdminRoute) {
            checkAuth();
        }
    }, [isAdminRoute, router]);

    // Render the app
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isAdminRoute ? (
                // Only render DashboardLayout if authenticated
                isAuthenticated ? (
                    <DashboardLayout>
                        <Component {...pageProps} />
                    </DashboardLayout>
                ) : (
                    // Render a loading state or null while checking auth
                    <div>Loading...</div>
                )
            ) : (
                // Render other routes directly
                <Component {...pageProps} />
            )}
        </ThemeProvider>
    );
}

export default MyApp;
