// File: app/admin/dashboard/components/TopBar.tsx
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps {
  role: 'admin' | 'trainer' | 'client'; // Dynamic role prop
}

const TopBar = ({ role }: TopBarProps) => {
  const getTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'trainer':
        return 'Trainer Dashboard';
      case 'client':
        return 'Client Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {getTitle()} {/* Dynamic title based on role */}
        </Typography>
        <IconButton color="inherit">
          <Avatar alt={`${role} Profile`} src="/path/to/profile-picture.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
