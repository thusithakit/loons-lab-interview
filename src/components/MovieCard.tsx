import { Card, CardMedia, CardContent, Typography, Box, Skeleton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import RatingBadge from './RatingBadge';
import FavoriteButton from './FavoriteButton';
import { getPosterUrl } from '../services/tmdb';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const PLACEHOLDER_POSTER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" fill="%23121829"><rect width="500" height="750"/><text x="250" y="375" fill="%239AA0B2" font-family="sans-serif" font-size="24" text-anchor="middle">No Poster</text></svg>'
  );

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const posterUrl = getPosterUrl(movie.poster_path, 'w500') || PLACEHOLDER_POSTER;

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(229,9,20,0.2)'
              : '0 12px 30px rgba(0,0,0,0.15)',
          '& .movie-overlay': { opacity: 1 },
          '& .movie-poster': { transform: 'scale(1.05)' },
        },
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          className="movie-poster"
          sx={{
            aspectRatio: '2/3',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <Box
          className="movie-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.9) 100%)',
            opacity: 0,
            transition: 'opacity 0.35s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#E8EAED',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.8rem',
              lineHeight: 1.5,
            }}
          >
            {movie.overview || 'No overview available.'}
          </Typography>
        </Box>

        <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
          <RatingBadge rating={movie.vote_average || 0} />
        </Box>

        <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
          <FavoriteButton movie={movie} />
        </Box>
      </Box>

      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.85rem',
          }}
        >
          {movie.title}
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {year}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function MovieCardSkeleton() {
  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Skeleton variant="rectangular" sx={{ aspectRatio: '2/3' }} />
      <CardContent sx={{ p: 1.5 }}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>
    </Card>
  );
}
