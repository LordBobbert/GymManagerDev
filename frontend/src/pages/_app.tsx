// src/pages/_app.tsx

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/layout/DashboardLayout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import { fetchCurrentUser } from '../api/authApi'; // Import a function to fetch the current user

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Determine if the current route is an admin route
    const isAdminRoute = router.pathname.startsWith('/admin');

    // Fetch the current user to ensure they are authenticated
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Optionally fetch the current user to check if they are authenticated
                await fetchCurrentUser(); // You can implement fetchCurrentUser in authApi.ts
            } catch (error) {
                console.error('User is not authenticated', error);
                // Optionally redirect to login page if not authenticated
                if (isAdminRoute) {
                    router.push('/auth/login');
                }
            }
        };

        // Only check authentication on admin routes
        if (isAdminRoute) {
            checkAuthentication();
        }
    }, [isAdminRoute, router]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isAdminRoute ? (
                // Wrap admin routes with the DashboardLayout
                <DashboardLayout>
                    <Component {...pageProps} />
                </DashboardLayout>
            ) : (
                // Other routes
                <Component {...pageProps} />
            )}
        </ThemeProvider>
    );
}

export default MyApp;
