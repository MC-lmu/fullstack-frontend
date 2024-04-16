/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { deepPurple, green, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: green[400],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;