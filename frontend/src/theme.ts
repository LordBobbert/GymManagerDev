import { createTheme } from '@mui/material/styles';

// Create a theme instance with the specified color scheme minus #B38A58.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // You can replace this with your primary color if needed
    },
    secondary: {
      main: '#dc004e', // Adjust as needed for your secondary color
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f4f4f9', // Light background for pages
      paper: '#ffffff',   // Default paper/card background
    },
    text: {
      primary: '#333333', // Darker text for high contrast
      secondary: '#666666', // Lighter text for secondary items
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`, // You can customize the font if needed
  },
});

export default theme;
