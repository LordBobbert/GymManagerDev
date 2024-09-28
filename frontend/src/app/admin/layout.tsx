// File: src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import AppBarMenu from './dashboard/components/AppBarMenu';
import { Box } from '@mui/material';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Assuming you have some auth logic to determine role
  const role: 'admin' | 'trainer' | 'client' = 'admin'; // Replace with dynamic logic

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarMenu role={role} /> {/* Dynamic role */}
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
}
