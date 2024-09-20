// File: Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, ListItemButton, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link'; // For navigation
import Image from 'next/image';

interface SidebarProps {
  role: 'admin' | 'trainer' | 'client';
}

const Sidebar = ({ role }: SidebarProps) => {
  // Define links based on roles
  const adminLinks = [
    { text: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon /> },
    { text: 'Clients', href: '/admin/clients', icon: <PeopleIcon /> },
    { text: 'Trainers', href: '/admin/trainers', icon: <PeopleIcon /> },
    { text: 'Sessions', href: '/admin/sessions', icon: <EventIcon /> },
    { text: 'Financials', href: '/admin/financials', icon: <MonetizationOnIcon /> },
    { text: 'Chat', href: '/admin/chat', icon: <ChatIcon /> },
  ];

  const trainerLinks = [
    { text: 'Dashboard', href: '/trainer/dashboard', icon: <DashboardIcon /> },
    { text: 'My Clients', href: '/trainer/clients', icon: <PeopleIcon /> },
    { text: 'My Sessions', href: '/trainer/sessions', icon: <EventIcon /> },
    { text: 'Financials', href: '/trainer/financials', icon: <MonetizationOnIcon /> },
    { text: 'Chat', href: '/trainer/chat', icon: <ChatIcon /> },
  ];

  const clientLinks = [
    { text: 'Dashboard', href: '/client/dashboard', icon: <DashboardIcon /> },
    { text: 'My Sessions', href: '/client/sessions', icon: <EventIcon /> },
    { text: 'Chat', href: '/client/chat', icon: <ChatIcon /> },
  ];

  const links = role === 'admin' ? adminLinks : role === 'trainer' ? trainerLinks : clientLinks;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: '#fff', // White background
          color: '#000', // Black text for the items
        },
      }}
    >
      {/* Logo at the top */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Image src="/logo_black.png" alt="Logo" width={100} height={100} />
      </Box>

      {/* Sidebar Links */}
      <List>
        {links.map((item) => (
          <Link href={item.href} passHref key={item.text}>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
