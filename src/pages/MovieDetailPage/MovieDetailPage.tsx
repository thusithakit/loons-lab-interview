// =============================================================================
// MovieDetailPage Component
// =============================================================================

import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Container,
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  Skeleton,
  IconButton,
  Divider,
  Paper,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  CalendarMonth,
  AccessTime,
  Language,
  PlayCircle,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  fetchMovieDetailRequest,
  clearDetail,
  toggleFavorite,
} from '../../store/actions/movieActions';
import RatingBadge from '../../components/RatingBadge';
import GenreChip from '../../components/GenreChip';
import CastAvatar from '../../components/CastAvatar';
import Heading from '../../components/Heading';
import { getPosterUrl, getBackdropUrl } from '../../services/tmdb';
import type { Movie, Genre, Video, CastMember } from '../../types';
import type { RootState } from '../../store/reducers';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const {
    selectedMovie: movie,
    selectedMovieCast: cast,
    selectedMovieVideos: videos,
    detailLoading: loading,
    favorites,
  } = useAppSelector((s: RootState) => s.movies);

  const movieId = Number(id);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailRequest(movieId));
    }
    return () => {
      dispatch(clearDetail());
    };
  }, [movieId, dispatch]);

  const isFavorite = favorites.some((f: Movie) => f.id === movieId);

  const trailer = videos.find(
    (v: Video) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  const handleToggleFavorite = () => {
    if (!movie) return;
    const movieForFav: Movie = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genre_ids: movie.genres.map((g: Genre) => g.id),
      adult: false,
      original_language: '',
      video: false,
    };
    dispatch(toggleFavorite(movieForFav));
  };

  if (loading || !movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 3, mb: 3 }} />
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </Container>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.split('-')[0];
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;
  const mins = movie.runtime ? movie.runtime % 60 : 0;

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 280, md: 420 },
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
              filter: theme.palette.mode === 'dark' ? 'brightness(0.4)' : 'brightness(0.65)',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${theme.palette.background.default} 100%)`,
          }}
        />

        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            color: '#FFF',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: { xs: -10, md: -16 }, position: 'relative', zIndex: 1, px: { xs: 2, md: 4 } }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={12}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              }}
            >
              {posterUrl ? (
                <Box component="img" src={posterUrl} alt={movie.title} sx={{ width: '100%', display: 'block' }} />
              ) : (
                <Box
                  sx={{
                    aspectRatio: '2/3',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">No Poster</Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Heading variant="h3" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' }, mb: 1 }}>
              {movie.title}
            </Heading>

            {movie.tagline && (
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 2, color: theme.palette.text.secondary }}>
                "{movie.tagline}"
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
              <RatingBadge rating={movie.vote_average || 0} size="medium" />
              {year && (
                <Chip icon={<CalendarMonth sx={{ fontSize: 16 }} />} label={year} variant="outlined" size="small" />
              )}
              {movie.runtime && (
                <Chip icon={<AccessTime sx={{ fontSize: 16 }} />} label={`${hours}h ${mins}m`} variant="outlined" size="small" />
              )}
              {movie.spoken_languages?.[0] && (
                <Chip icon={<Language sx={{ fontSize: 16 }} />} label={movie.spoken_languages[0].english_name} variant="outlined" size="small" />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {movie.genres.map((g: Genre) => (
                <GenreChip key={g.id} label={g.name} />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              {trailer && (
                <Button
                  variant="contained"
                  startIcon={<PlayCircle />}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
                    color: '#FFF',
                    fontWeight: 700,
                  }}
                >
                  Watch Trailer
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={handleToggleFavorite}
                color={isFavorite ? 'error' : 'inherit'}
                sx={{ fontWeight: 600 }}
              >
                {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
              </Button>
            </Box>

            <Heading variant="h6" sx={{ mb: 1 }}>Overview</Heading>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3, color: theme.palette.text.secondary }}>
              {movie.overview || 'No overview available for this movie.'}
            </Typography>

            {(movie.budget > 0 || movie.revenue > 0) && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {movie.budget > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Budget</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>${movie.budget.toLocaleString()}</Typography>
                    </Box>
                  )}
                  {movie.revenue > 0 && (
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Revenue</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>${movie.revenue.toLocaleString()}</Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Status</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{movie.status}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </Grid>

        {trailer && (
          <Box sx={{ mt: 6 }}>
            <Heading variant="h5" sx={{ mb: 2 }}>🎬 Trailer</Heading>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </Box>
        )}

        {cast.length > 0 && (
          <Box sx={{ mt: 6, mb: 6 }}>
            <Heading variant="h5" sx={{ mb: 2 }}>🎭 Cast</Heading>
            <Box
              sx={{
                display: 'flex',
                gap: 2.5,
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': { height: 6 },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: theme.palette.divider,
                  borderRadius: 3,
                },
              }}
            >
              {cast.slice(0, 20).map((member: CastMember) => (
                <CastAvatar key={member.id} cast={member} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
