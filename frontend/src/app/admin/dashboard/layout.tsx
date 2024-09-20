// File: app/admin/dashboard/layout.tsx
"use client";
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import AppBarMenu from './components/AppBarMenu';

interface AdminDashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'trainer' | 'client'; // Role-based content switching
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar with Menu */}
      <AppBarMenu onMenuToggle={() => {}} role="admin" /> {/* Pass role here */}
      
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
