// File: src/app/admin/dashboard/layout.tsx

"use client";
import React, { ReactNode } from 'react';
import AppBarMenu from './components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminDashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'trainer' | 'client';  // Ensure 'role' prop is correctly defined
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
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
