import React from 'react';
import { Box, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import Link from 'next/link'; // Import Link from Next.js
import {
  Dashboard as DashboardIcon,
  Person,
  SupervisorAccount,
  FitnessCenter,
  CalendarToday,
  AttachMoney,
  Chat,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },  // Add this line
  { text: 'Clients', icon: <Person />, path: '/admin/clients/ClientsPage' },
  { text: 'Trainers', icon: <SupervisorAccount />, path: '/admin/trainers/TrainersPage' },
  { text: 'Sessions', icon: <FitnessCenter />, path: '/admin/sessions/SessionPage' },
  { text: 'Calendar', icon: <CalendarToday />, path: '/dashboard/admin/calendar' },
  { text: 'Financials', icon: <AttachMoney />, path: '/dashboard/admin/financials' },
  { text: 'Chat', icon: <Chat />, path: '/dashboard/admin/chat' },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#282c34',
        color: '#fff',
        height: '100vh',
        padding: '1rem',
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={Link} // Use Link as the component
            href={item.path} // Pass the href directly
            sx={{
              color: '#fff',
              mb: 1,
              '&:hover': { bgcolor: '#37474F' },
              borderRadius: 1, // Add border-radius for a cleaner look
              padding: '10px', // Add padding to each item
              textDecoration: 'none' // Remove underline
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
