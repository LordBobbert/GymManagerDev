// File: src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import AppBarMenu from './dashboard/components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role="admin" /> {/* Or dynamically fetch role */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Adjust top margin to account for the AppBar
          backgroundColor: '#f4f4f4',
        }}
      >
        {children} {/* This ensures the child page (like /clients) is rendered here */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
