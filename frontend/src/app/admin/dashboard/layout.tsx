// File: src/app/admin/dashboard/layout.tsx
"use client";
import React, { ReactNode, useState } from 'react';
import AppBarMenu from './components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Managing the state of the sidebar

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar and Drawer */}
      <AppBarMenu isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          backgroundColor: '#f4f4f4',
          // Adjust the margin based on whether the drawer is open or closed
          marginLeft: isDrawerOpen ? '0px' : '0px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
