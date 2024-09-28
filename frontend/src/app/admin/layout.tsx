// File: src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import AppBarMenu from './dashboard/components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminLayoutProps {
  children: ReactNode;
  role: 'admin' | 'trainer' | 'client';  // Role passed down to determine the menu
}

const AdminLayout = ({ children, role }: AdminLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role={role} />  {/* Pass down the role prop */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',  // Adjust top margin to account for the AppBar
          backgroundColor: '#f4f4f4',
        }}
      >
        {children}  {/* Child pages are rendered here */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
