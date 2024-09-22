// File: src/app/admin/dashboard/layout.tsx

import React, { ReactNode } from 'react';
import AppBarMenu from './components/AppBarMenu';
import { Box } from '@mui/material';

// Remove additional props like "role" if unnecessary
interface AdminDashboardLayoutProps {
  children: ReactNode; // Ensure children is defined, required by Next.js layouts
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role="admin" /> {/* Hardcode role if needed */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          backgroundColor: '#f4f4f4',
        }}
      >
        {children}  {/* Always render children */}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
