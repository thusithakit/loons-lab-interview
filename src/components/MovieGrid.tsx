import { Box, Typography, Button, CircularProgress, useTheme } from '@mui/material';
import { ExpandMore, Movie as MovieIcon } from '@mui/icons-material';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import Heading from './Heading';
import type { Movie } from '../types';

interface MovieGridProps {
  title?: string;
  movies: Movie[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  emptyMessage?: string;
}

export default function MovieGrid({
  title,
  movies,
  loading = false,
  hasMore = false,
  onLoadMore,
  emptyMessage = 'No movies found.',
}: MovieGridProps) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 6 }}>
      {title && (
        <Heading
          variant="h5"
          sx={{
            mb: 3,
            position: 'relative',
            pl: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 4,
              height: '70%',
              borderRadius: 2,
              background: 'linear-gradient(180deg, #E50914 0%, #F5C518 100%)',
            },
          }}
        >
          {title}
        </Heading>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(6, 1fr)',
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {loading &&
          Array.from({ length: 10 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
      </Box>

      {!loading && movies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
          <MovieIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1.5 }} />
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            {emptyMessage}
          </Typography>
        </Box>
      )}

      {hasMore && onLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onLoadMore}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <ExpandMore />}
            sx={{
              px: 4,
              py: 1.2,
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 700,
              borderRadius: 1,
              '&:hover': {
                background: 'rgba(229,9,20,0.08)',
              },
            }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
