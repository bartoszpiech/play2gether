import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
 palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(94,63,161)',
    },
    secondary: {
      main: 'rgb(209, 188, 255)',
    },
    background: {
      default: '#303030',
    },
    text: {
      primary: '#ffffff',
    },
  },
});
