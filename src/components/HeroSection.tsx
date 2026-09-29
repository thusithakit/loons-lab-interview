import { Box, Typography, Button, Skeleton, useTheme } from '@mui/material';
import { PlayArrow, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import GenreChip from './GenreChip';
import RatingBadge from './RatingBadge';
import { getBackdropUrl } from '../services/tmdb';
import type { Movie, Genre } from '../types';

interface HeroSectionProps {
  movie: Movie | null;
  genres: Genre[];
  loading: boolean;
}

export default function HeroSection({ movie, genres, loading }: HeroSectionProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  if (loading || !movie) {
    return (
      <Box sx={{ position: 'relative', height: { xs: 380, md: 520 }, mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const year = movie.release_date?.split('-')[0];
  const movieGenres = movie.genre_ids
    ?.map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 400, md: 520 },
        mb: 4,
        overflow: 'hidden',
      }}
    >
      {backdropUrl && (
        <Box
          component="img"
          src={backdropUrl}
          alt={movie.title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: theme.palette.mode === 'dark' ? 'brightness(0.55)' : 'brightness(0.75)',
          }}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(90deg, ${theme.palette.background.default}ee 0%, transparent 65%), linear-gradient(180deg, transparent 50%, ${theme.palette.background.default} 100%)`
              : `linear-gradient(90deg, ${theme.palette.background.default}f2 0%, transparent 70%), linear-gradient(180deg, transparent 50%, ${theme.palette.background.default} 100%)`,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 6 },
          maxWidth: 750,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {movieGenres?.map((genre) => (
            <GenreChip key={genre} label={genre as string} />
          ))}
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
            lineHeight: 1.15,
            mb: 1.5,
            color: theme.palette.text.primary,
            textShadow: theme.palette.mode === 'dark' ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {movie.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <RatingBadge rating={movie.vote_average || 0} size="medium" />
          {year && (
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
              {year}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 3,
            lineHeight: 1.7,
            maxWidth: 580,
          }}
        >
          {movie.overview}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => navigate(`/movie/${movie.id}`)}
            sx={{
              background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
              color: '#FFF',
              fontWeight: 700,
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #B2070F 0%, #E50914 100%)',
                transform: 'scale(1.03)',
              },
              transition: 'all 0.2s',
            }}
          >
            Watch Trailer
          </Button>
          <Button
            variant="outlined"
            startIcon={<Info />}
            onClick={() => navigate(`/movie/${movie.id}`)}
            sx={{
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.text.primary,
                bgcolor: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            More Info
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
