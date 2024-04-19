/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { green, lime, red, cyan } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: cyan[800],
    },
    secondary: {
      main: lime[300],
    },
    success: {
      main: green[900]
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;