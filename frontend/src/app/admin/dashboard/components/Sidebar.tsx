"use client";

import { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import MenuOpenIcon from '@mui/icons-material/MenuOpen'; // Icon for toggling sidebar
import Link from 'next/link';
import Image from 'next/image';
import logoBlack from '/public/logo_black.png'; // Correct usage of Next.js Image

interface SidebarProps {
  role: 'admin' | 'trainer' | 'client'; // Role-based content switching
}

interface MenuItem {
  text: string;
  icon: JSX.Element;
  href: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true); // Sidebar starts expanded

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Menu items for each role
  const adminMenuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
    { text: 'Clients', icon: <PeopleIcon />, href: '/admin/clients' },
    { text: 'Trainers', icon: <FitnessCenterIcon />, href: '/admin/trainers' },
    { text: 'Sessions', icon: <CalendarTodayIcon />, href: '/admin/sessions' },
    { text: 'Financials', icon: <MonetizationOnIcon />, href: '/admin/financials' },
    { text: 'Chat', icon: <ChatIcon />, href: '/admin/chat' },
  ];

  const trainerMenuItems: MenuItem[] = [
    { text: 'My Clients', icon: <PeopleIcon />, href: '/trainer/clients' },
    { text: 'My Sessions', icon: <CalendarTodayIcon />, href: '/trainer/sessions' },
    { text: 'Chat', icon: <ChatIcon />, href: '/trainer/chat' },
  ];

  const clientMenuItems: MenuItem[] = [
    { text: 'My Sessions', icon: <CalendarTodayIcon />, href: '/client/sessions' },
    { text: 'Progress', icon: <FitnessCenterIcon />, href: '/client/progress' },
    { text: 'Chat', icon: <ChatIcon />, href: '/client/chat' },
  ];

  // Select the correct menu items based on role
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
    <Drawer
      variant="permanent"
      sx={{
        width: isExpanded ? 240 : 60, // Adjust the width based on expansion
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? 240 : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease', // Smooth transition when expanding/collapsing
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add a drop shadow
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'space-between' : 'center',
          padding: '10px',
        }}
      >
        {isExpanded && (
          <Image src={logoBlack} alt="Logo" width={40} height={40} priority />
        )}
        <IconButton onClick={toggleSidebar}>
          <MenuOpenIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} passHref style={{ textDecoration: 'none' }}> {/* Removes underline */}
            <ListItemButton
              sx={{
                justifyContent: isExpanded ? 'initial' : 'center',
                paddingLeft: isExpanded ? 2 : 1,
                color: '#333', // Default text color
                '&:hover': {
                  backgroundColor: '#f0f0f0', // Light gray background on hover
                  color: '#1976d2', // Change text color on hover
                },
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: 0,
                  mr: isExpanded ? 3 : 'auto',
                  color: 'inherit', // Inherit text color
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  primary={item.text}
                  sx={{ color: 'inherit' }} // Ensure the text color inherits the hover color
                />
              )}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
