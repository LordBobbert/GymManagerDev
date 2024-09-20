"use client"; // Client-side component

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarMenuProps {
  onMenuToggle: () => void;
  role: 'admin' | 'trainer' | 'client'; // Ensure that role is passed correctly as a prop
}

const AppBarMenu: React.FC<AppBarMenuProps> = ({ onMenuToggle, role }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  interface MenuItem {
    text: string;
    href: string;
  }

  // Define the menu items
  const adminMenuItems: MenuItem[] = [
    { text: 'Dashboard', href: '/admin/dashboard' },
    { text: 'Clients', href: '/admin/clients' },
    { text: 'Trainers', href: '/admin/trainers' },
    { text: 'Sessions', href: '/admin/sessions' },
    { text: 'Financials', href: '/admin/financials' },
    { text: 'Chat', href: '/admin/chat' },
  ];

  const trainerMenuItems: MenuItem[] = [
    { text: 'My Clients', href: '/trainer/clients' },
    { text: 'My Sessions', href: '/trainer/sessions' },
    { text: 'Chat', href: '/trainer/chat' },
  ];

  const clientMenuItems: MenuItem[] = [
    { text: 'My Sessions', href: '/client/sessions' },
    { text: 'Progress', href: '/client/progress' },
  ];

  // Initialize the menuItems with the correct type
  let menuItems: MenuItem[] = [];

  switch (role) {
    case 'admin':
      menuItems = adminMenuItems;
      break;
    case 'trainer':
      menuItems = trainerMenuItems;
      break;
    case 'client':
      menuItems = clientMenuItems;
      break;
    default:
      menuItems = [];
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuToggle} // Handle sidebar toggle
        >
          <MenuIcon />
        </IconButton>

        {/* Ensure role is defined and has a value */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard` : 'Dashboard'}
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMenu;