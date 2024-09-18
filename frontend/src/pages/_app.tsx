// src/pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import DashboardLayout from '../layouts/DashboardLayout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Determine if the current route is an admin route
    const isAdminRoute = router.pathname.startsWith('/admin');

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
