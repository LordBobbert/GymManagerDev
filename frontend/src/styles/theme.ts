// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

// Define your colors
const primaryMain = '#264027';
const secondaryMain = '#3C5233';
const backgroundMain = '#0D1F22';
const accentColor = '#6F732F';
const textColor = '#FFFFFF'; // White

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      contrastText: textColor, // Ensure text is readable on the primary color
    },
    secondary: {
      main: secondaryMain,
      contrastText: textColor, // Ensure text is readable on the secondary color
    },
    background: {
      default: backgroundMain, // Background color for the whole application
      paper: primaryMain, // Background color for paper components
    },
    text: {
      primary: textColor, // Primary text color
      secondary: accentColor, // Secondary text color
    },
    success: {
      main: accentColor, // You can use this for success components
    },
  },
  typography: {
    // Customize typography settings if needed
    fontFamily: 'Roboto, Arial, sans-serif',
    // Example of how to customize heading styles
    h1: {
      color: textColor,
    },
    body1: {
      color: textColor,
    },
  },
  // Add any other customizations you want here, like components or spacing
});

export default theme;
