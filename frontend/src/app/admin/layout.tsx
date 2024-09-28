// File: src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import AppBarMenu from './dashboard/components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminLayoutProps {
  children: ReactNode;
  role: 'admin' | 'trainer' | 'client';  // Define the role as part of the props
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, role }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role={role} />  {/* Pass the role prop to AppBarMenu */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',  // Adjust top margin to account for the AppBar
          backgroundColor: '#f4f4f4',
        }}
      >
        {children}  {/* This renders the child pages */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
