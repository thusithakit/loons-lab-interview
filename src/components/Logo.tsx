// =============================================================================
// Logo Component
// =============================================================================

import { Box, Typography, useTheme } from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function Logo() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      onClick={() => navigate('/')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        mr: 2,
        '&:hover': { opacity: 0.85 },
        transition: 'opacity 0.2s',
      }}
    >
      <MovieIcon sx={{ color: 'primary.main', fontSize: 32 }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          letterSpacing: '-0.02em',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        Movie<Box component="span" sx={{ color: 'primary.main' }}>Explorer</Box>
      </Typography>
    </Box>
  );
}
