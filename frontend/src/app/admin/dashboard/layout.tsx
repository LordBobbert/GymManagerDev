// File: src/app/admin/dashboard/layout.tsx
import React, { ReactNode } from 'react';
import AppBarMenu from './components/AppBarMenu';
import { Box } from '@mui/material';

interface AdminDashboardLayoutProps {
  children: ReactNode; // Ensure children is defined, required by Next.js layouts
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role="admin" /> {/* Sidebar or AppBar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Adjust for the AppBar height
          backgroundColor: '#f4f4f4',
        }}
      >
        {children}  {/* Render the page content here */}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
