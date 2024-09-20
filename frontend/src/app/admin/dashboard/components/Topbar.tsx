// File: components/TopBar.tsx
"use client";

import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface TopBarProps {
  role?: 'admin' | 'trainer' | 'client'; // Optional to avoid undefined errors
}

const TopBar = ({ role = 'admin' }: TopBarProps) => {
  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </Typography>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <SearchIcon />
          <InputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
        </div>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
