// File: src/app/admin/dashboard/layout.tsx
"use client"; // If you use client-side hooks or state in the layout

import React, { ReactNode } from 'react';
import AppBarMenu from './components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminDashboardLayoutProps {
  children: ReactNode; // Ensure children is defined
  role: 'admin' | 'trainer' | 'client';  // If you have other props like "role"
}

const AdminDashboardLayout = ({ children, role }: AdminDashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Pass the role prop to AppBarMenu */}
      <AppBarMenu role={role} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          backgroundColor: '#f4f4f4',
        }}
      >
        {children}  {/* Render children */}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
