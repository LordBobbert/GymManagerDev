// Topbar.tsx

import { AppBar, Toolbar, IconButton, InputBase, Box, Menu, MenuItem } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';
import { useState } from 'react';

const Topbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#1976d2' }}> {/* Set background color */}
            <Toolbar>
                {/* Search Bar */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Search sx={{ color: '#fff', mr: 1 }} />
                    <InputBase
                        placeholder="Search…"
                        sx={{
                            color: '#fff',
                            padding: '6px 10px',
                            backgroundColor: '#1e88e5',
                            borderRadius: '4px',
                            width: '100%',
                        }}
                    />
                </Box>
                {/* Notification Bell */}
                <IconButton sx={{ color: '#fff', mr: 2 }}>
                    <Notifications />
                </IconButton>
                {/* Profile Picture */}
                <IconButton sx={{ color: '#fff' }} onClick={handleMenu}>
                    <AccountCircle />
                </IconButton>
                {/* Dropdown Menu */}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Notifications</MenuItem>
                    <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
