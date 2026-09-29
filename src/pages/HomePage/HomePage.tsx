// =============================================================================
// HomePage Component — Clean typography without emojis, using MUI icons
// =============================================================================

import { useEffect } from 'react';
import { Container, Box, Button, useTheme } from '@mui/material';
import { FilterList, Whatshot, Movie as MovieIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import type { RootState } from '../../store/reducers';
import { discoverMoviesRequest, fetchGenresRequest, fetchTrendingRequest } from '../../store/actions/movieActions';
import HeroSection from '../../components/HeroSection';
import MovieGrid from '../../components/MovieGrid';

interface HomePageProps {
  onOpenFilterSidebar?: () => void;
}

export default function HomePage({ onOpenFilterSidebar }: HomePageProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {
    trending,
    trendingPage,
    trendingTotalPages,
    trendingLoading,
    genres,
    genresLoaded,
    filters,
    filteredMovies,
    filteredPage,
    filteredTotalPages,
    filteredLoading,
  } = useAppSelector((s: RootState) => s.movies);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrendingRequest(1));
    }
    if (!genresLoaded) {
      dispatch(fetchGenresRequest());
    }
    if (filteredMovies.length === 0 && !filteredLoading) {
      dispatch(discoverMoviesRequest(filters, 1));
    }
  }, [dispatch, trending.length, genresLoaded, filteredMovies.length, filteredLoading, filters]);

  const handleLoadMoreTrending = () => {
    if (trendingPage < trendingTotalPages) {
      dispatch(fetchTrendingRequest(trendingPage + 1));
    }
  };

  const handleLoadMoreFiltered = () => {
    if (filteredPage < filteredTotalPages) {
      dispatch(discoverMoviesRequest(filters, filteredPage + 1));
    }
  };

  const heroMovie = trending.length > 0 ? trending[0] : null;
  const isFiltered = filters.genre !== null || filters.year !== null || filters.minRating !== null;

  return (
    <Box>
      <HeroSection
        movie={heroMovie}
        genres={genres}
        loading={trendingLoading && trending.length === 0}
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Trending Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Whatshot sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>
        <MovieGrid
          title="Trending Now"
          movies={trending}
          loading={trendingLoading}
          hasMore={trendingPage < trendingTotalPages}
          onLoadMore={handleLoadMoreTrending}
        />

        {/* Filter Sidebar Trigger */}
        <Box sx={{ mt: 5, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {onOpenFilterSidebar && (
            <Button
              variant="contained"
              startIcon={<FilterList />}
              onClick={onOpenFilterSidebar}
              sx={{
                background: 'linear-gradient(135deg, #E50914 0%, #FF3D47 100%)',
                color: '#FFF',
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 1,
              }}
            >
              Filter Movies Sidebar
            </Button>
          )}
        </Box>

        {/* Discovery & Filtered Results Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <MovieIcon sx={{ color: 'primary.main', fontSize: 26 }} />
        </Box>
        <MovieGrid
          title={isFiltered ? 'Filtered Results' : 'Popular Movies'}
          movies={filteredMovies}
          loading={filteredLoading}
          hasMore={filteredPage < filteredTotalPages}
          onLoadMore={handleLoadMoreFiltered}
          emptyMessage="No movies found matching the selected filters. Try changing your search options."
        />
      </Container>
    </Box>
  );
}
