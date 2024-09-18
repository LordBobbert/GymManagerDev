// src/components/layout/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type DashboardLayoutProps = {
    children: ReactNode; // Define children as a prop of type ReactNode
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Topbar */}
                <Topbar />

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, padding: 3, bgcolor: '#f0f2f5' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
