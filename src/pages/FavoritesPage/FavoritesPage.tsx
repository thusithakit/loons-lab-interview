// =============================================================================
// FavoritesPage Component
// =============================================================================

import { Container, Box, Typography, Button, useTheme } from '@mui/material';
import { FavoriteOutlined, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/useRedux';
import MovieGrid from '../../components/MovieGrid';
import Heading from '../../components/Heading';
import type { RootState } from '../../store/reducers';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const favorites = useAppSelector((s: RootState) => s.movies.favorites);

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <FavoriteOutlined sx={{ color: 'primary.main', fontSize: 28 }} />
          <Heading variant="h5">My Favorites</Heading>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {favorites.length > 0
            ? `You have ${favorites.length} movie${favorites.length > 1 ? 's' : ''} saved.`
            : 'Movies you favorite will appear here.'}
        </Typography>
      </Box>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h1" sx={{ mb: 2, fontSize: '4rem' }}>
            💔
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, color: theme.palette.text.secondary }}>
            No favorites yet
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
            Start exploring and click the heart icon on movies you love!
          </Typography>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
              color: '#FFF',
              fontWeight: 700,
            }}
          >
            Explore Movies
          </Button>
        </Box>
      )}
    </Container>
  );
}
