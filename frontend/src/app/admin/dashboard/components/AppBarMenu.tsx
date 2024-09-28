// File: src/app/admin/dashboard/components/AppBarMenu.tsx
"use client";  // Ensure this is client-side code
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // Use this instead of require('next/router')
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';

interface AppBarMenuProps {
  role: 'admin' | 'trainer' | 'client';
}

const AppBarMenu = ({ role }: AppBarMenuProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const pathname = usePathname();  // Use the new Next.js 13 `usePathname()` hook for client-side routing

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Admin menu items
  const adminMenuItems = [
    { text: 'Home', href: '/admin/dashboard', icon: <HomeIcon /> },
    { text: 'Clients', href: '/admin/clients', icon: <PeopleIcon /> },
    { text: 'Trainers', href: '/admin/trainers', icon: <PeopleIcon /> },
    { text: 'Sessions', href: '/admin/sessions', icon: <EventIcon /> },
    { text: 'Financials', href: '/admin/financials', icon: <AttachMoneyIcon /> },
    { text: 'Chat', href: '/admin/chat', icon: <ChatIcon /> },
  ];

  // Trainer menu items
  const trainerMenuItems = [
    { text: 'Home', href: '/trainer/dashboard', icon: <HomeIcon /> },
    { text: 'Sessions', href: '/trainer/sessions', icon: <EventIcon /> },
    { text: 'Chat', href: '/trainer/chat', icon: <ChatIcon /> },
  ];

  // Client menu items
  const clientMenuItems = [
    { text: 'Home', href: '/client/dashboard', icon: <HomeIcon /> },
    { text: 'Sessions', href: '/client/sessions', icon: <EventIcon /> },
    { text: 'Chat', href: '/client/chat', icon: <ChatIcon /> },
  ];

  // Select menu items based on role
  const menuItems = role === 'admin' ? adminMenuItems :
    role === 'trainer' ? trainerMenuItems :
      clientMenuItems;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: isDrawerOpen ? 240 : 60,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? 240 : 60,
            marginTop: '64px',
            height: `calc(100% - 64px)`,
            overflowX: 'hidden',
            transition: 'width 0.3s',
            backgroundColor: '#f8f9fa',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box role="presentation" sx={{ display: 'flex', flexDirection: 'column', alignItems: isDrawerOpen ? 'flex-start' : 'center' }}>
          <List sx={{ width: '100%' }}>
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index} prefetch={false} passHref>
                <Tooltip title={isDrawerOpen ? '' : item.text} placement="right">
                  <ListItemButton
                    sx={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      margin: '5px 10px',
                      '&:hover': {
                        backgroundColor: '#eceff1',
                      },
                      backgroundColor: pathname === item.href ? '#e3f2fd' : 'inherit',
                    }}
                  >
                    <ListItemIcon sx={{ color: '#546e7a', minWidth: '40px' }}>{item.icon}</ListItemIcon>
                    {isDrawerOpen && <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500, color: '#37474f' }} />}
                  </ListItemButton>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppBarMenu;
