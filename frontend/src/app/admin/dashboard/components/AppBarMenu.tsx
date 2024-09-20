// File: src/app/admin/dashboard/components/AppBarMenu.tsx
"use client";
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Tooltip, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

interface AppBarMenuProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define menu items
const menuItems = [
  { text: 'Home', href: '/admin/dashboard', icon: <HomeIcon /> },
  { text: 'Clients', href: '/admin/clients', icon: <PeopleIcon /> },
  { text: 'Trainers', href: '/admin/trainers', icon: <PeopleIcon /> },
  { text: 'Sessions', href: '/admin/sessions', icon: <EventIcon /> },
  { text: 'Financials', href: '/admin/financials', icon: <AttachMoneyIcon /> },
  { text: 'Chat', href: '/admin/chat', icon: <ChatIcon /> },
];

const drawerHeight = 64; // AppBar height

const AppBarMenu = ({ isDrawerOpen, setIsDrawerOpen }: AppBarMenuProps) => {
  // Toggle the drawer open/close
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* AppBar at the top */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          {/* Profile icon on the right side of the Appbar */}
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: isDrawerOpen ? 240 : 60,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? 240 : 60,
            marginTop: `${drawerHeight}px`,
            height: `calc(100% - ${drawerHeight}px)`,
            overflowX: 'hidden',
            transition: 'width 0.3s',
          }
        }}
      >
        <Box
          role="presentation"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: isDrawerOpen ? 'flex-start' : 'center' }}
        >
          <List>
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index} passHref>
                <Tooltip title={isDrawerOpen ? '' : item.text} placement="right">
                  <ListItemButton sx={{
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    paddingLeft: isDrawerOpen ? 2 : 1,  // Add padding to the left
                    paddingRight: isDrawerOpen ? 2 : 1,  // Reduce padding on the right
                  }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0, // Remove minWidth for icon
                        mr: isDrawerOpen ? 2 : 'auto', // Adjust margin based on the menu state
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
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
