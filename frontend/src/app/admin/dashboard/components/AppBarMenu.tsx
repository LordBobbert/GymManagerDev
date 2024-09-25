// File: src/app/admin/dashboard/components/AppBarMenu.tsx

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';

interface AppBarMenuProps {
  role: 'admin' | 'trainer' | 'client'; // Role prop definition
}

const AppBarMenu = ({ role }: AppBarMenuProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Define role-specific menu items based on the role
  const adminMenuItems = [
    { text: 'Home', href: '/admin/dashboard', icon: <HomeIcon /> },
    { text: 'Clients', href: '/admin/clients', icon: <PeopleIcon /> },
    { text: 'Trainers', href: '/admin/trainers', icon: <PeopleIcon /> },
    { text: 'Sessions', href: '/admin/sessions', icon: <EventIcon /> },
    { text: 'Financials', href: '/admin/financials', icon: <AttachMoneyIcon /> },
    { text: 'Chat', href: '/admin/chat', icon: <ChatIcon /> },
  ];

  const trainerMenuItems = [
    { text: 'Home', href: '/trainer/dashboard', icon: <HomeIcon /> },
    { text: 'Sessions', href: '/trainer/sessions', icon: <EventIcon /> },
    { text: 'Chat', href: '/trainer/chat', icon: <ChatIcon /> },
  ];

  const clientMenuItems = [
    { text: 'Home', href: '/client/dashboard', icon: <HomeIcon /> },
    { text: 'Sessions', href: '/client/sessions', icon: <EventIcon /> },
    { text: 'Chat', href: '/client/chat', icon: <ChatIcon /> },
  ];

  // Conditionally render menu items based on the role
  const menuItems = role === 'admin' ? adminMenuItems :
    role === 'trainer' ? trainerMenuItems :
      clientMenuItems;  // Defaults to client if no match

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard {/* Capitalizes the role */}
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
          },
        }}
      >
        <Box role="presentation" sx={{ display: 'flex', flexDirection: 'column', alignItems: isDrawerOpen ? 'flex-start' : 'center' }}>
          <List>
            {menuItems.map((item, index) => (
              // Disable prefetching if you want to avoid unnecessary preloading
              <Link href={item.href} key={index} prefetch={false} passHref>
                <Tooltip title={isDrawerOpen ? '' : item.text} placement="right">
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {isDrawerOpen && <ListItemText primary={item.text} />}
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
