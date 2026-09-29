import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914',
      light: '#FF3D47',
      dark: '#B2070F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F5C518',
      light: '#FFD74B',
      dark: '#C49E00',
      contrastText: '#000000',
    },
    background: {
      default: '#0A0E17',
      paper: '#121829',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0B2',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, color: '#E8EAED' },
    h2: { fontWeight: 800, color: '#E8EAED' },
    h3: { fontWeight: 800, color: '#E8EAED' },
    h4: { fontWeight: 700, color: '#E8EAED' },
    h5: { fontWeight: 700, color: '#E8EAED' },
    h6: { fontWeight: 600, color: '#E8EAED' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 4, // Reduced border radius
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#E8EAED',
          backgroundColor: '#0A0E17',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 18px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 6,
        },
      },
    },
  },
});

/** Light Theme - Clean white & soft slate with reduced border radius */
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F57F17',
      light: '#FFD54F',
      dark: '#C49E00',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, color: '#111827' },
    h2: { fontWeight: 800, color: '#111827' },
    h3: { fontWeight: 800, color: '#111827' },
    h4: { fontWeight: 700, color: '#111827' },
    h5: { fontWeight: 700, color: '#111827' },
    h6: { fontWeight: 600, color: '#111827' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 4, // Reduced border radius
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#111827',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 18px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});
