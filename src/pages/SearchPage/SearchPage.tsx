// =============================================================================
// SearchPage Component
// =============================================================================

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { Container, Box, Typography, Chip, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { searchMoviesRequest } from '../../store/actions/movieActions';
import MovieGrid from '../../components/MovieGrid';
import Heading from '../../components/Heading';
import type { RootState } from '../../store/reducers';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    searchResults,
    searchQuery,
    searchPage,
    searchTotalPages,
    searchLoading,
  } = useAppSelector((s: RootState) => s.movies);

  useEffect(() => {
    if (query && query !== searchQuery) {
      dispatch(searchMoviesRequest(query, 1));
    }
  }, [query, searchQuery, dispatch]);

  useEffect(() => {
    if (query && searchResults.length === 0 && !searchLoading && searchPage === 0) {
      dispatch(searchMoviesRequest(query, 1));
    }
  }, [query, searchResults.length, searchLoading, searchPage, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (searchPage < searchTotalPages && query) {
      dispatch(searchMoviesRequest(query, searchPage + 1));
    }
  }, [dispatch, query, searchPage, searchTotalPages]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <SearchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Heading variant="h5">Search Results</Heading>
        </Box>
        {query && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Showing results for
            </Typography>
            <Chip label={`"${query}"`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
          </Box>
        )}
      </Box>

      <MovieGrid
        movies={searchResults}
        loading={searchLoading}
        hasMore={searchPage < searchTotalPages}
        onLoadMore={handleLoadMore}
        emptyMessage={
          query
            ? `No movies found for "${query}". Try searching another keyword.`
            : 'Type in the search bar above to find movies.'
        }
      />
    </Container>
  );
}
