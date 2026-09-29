import { Box, Card, useTheme } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at 20% 50%, rgba(229,9,20,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(245,197,24,0.1) 0%, transparent 50%), linear-gradient(180deg, #0A0E17 0%, #121829 100%)'
            : 'radial-gradient(ellipse at 20% 50%, rgba(211,47,47,0.1) 0%, transparent 50%), linear-gradient(180deg, #F8F9FA 0%, #E9ECEF 100%)',
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          p: { xs: 3, sm: 4 },
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(18,24,41,0.85)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
        }}
      >
        {children}
      </Card>
    </Box>
  );
}
