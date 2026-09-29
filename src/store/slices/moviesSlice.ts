// =============================================================================
// Movies Slice — manages movie data, search, trending, and filters
// Async thunks handle TMDb API calls; last search persisted to localStorage
// =============================================================================

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie, MovieDetails, CastMember, Video, Genre, MovieFilters } from '../../types';
import {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchGenres,
  discoverMovies,
} from '../../services/tmdb';

// ─── State Shape ──────────────────────────────────────────────────────────────

interface MoviesState {
  // Trending
  trending: Movie[];
  trendingPage: number;
  trendingTotalPages: number;
  trendingLoading: boolean;

  // Search
  searchResults: Movie[];
  searchQuery: string;
  searchPage: number;
  searchTotalPages: number;
  searchLoading: boolean;

  // Movie detail
  selectedMovie: MovieDetails | null;
  selectedMovieCast: CastMember[];
  selectedMovieVideos: Video[];
  detailLoading: boolean;

  // Genres
  genres: Genre[];
  genresLoaded: boolean;

  // Filters
  filters: MovieFilters;
  filteredMovies: Movie[];
  filteredPage: number;
  filteredTotalPages: number;
  filteredLoading: boolean;

  // Favorites (persisted to localStorage)
  favorites: Movie[];

  // Error
  error: string | null;
}

// Rehydrate favorites and last search from localStorage
const storedFavorites = localStorage.getItem('movie_explorer_favorites');
const storedLastSearch = localStorage.getItem('movie_explorer_last_search');

const initialState: MoviesState = {
  trending: [],
  trendingPage: 0,
  trendingTotalPages: 1,
  trendingLoading: false,

  searchResults: [],
  searchQuery: storedLastSearch || '',
  searchPage: 0,
  searchTotalPages: 1,
  searchLoading: false,

  selectedMovie: null,
  selectedMovieCast: [],
  selectedMovieVideos: [],
  detailLoading: false,

  genres: [],
  genresLoaded: false,

  filters: {
    genre: null,
    year: null,
    minRating: null,
    sortBy: 'popularity.desc',
  },
  filteredMovies: [],
  filteredPage: 0,
  filteredTotalPages: 1,
  filteredLoading: false,

  favorites: storedFavorites ? JSON.parse(storedFavorites) : [],

  error: null,
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/** Load next page of trending movies */
export const loadTrending = createAsyncThunk(
  'movies/loadTrending',
  async (page: number) => {
    const data = await fetchTrendingMovies('day', page);
    return data;
  }
);

/** Search movies by query — page 1 replaces results, page > 1 appends */
export const searchMoviesThunk = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const data = await searchMovies(query, page);
    return { ...data, query, requestedPage: page };
  }
);

/** Fetch complete movie detail (info + credits + videos) */
export const loadMovieDetail = createAsyncThunk(
  'movies/loadMovieDetail',
  async (movieId: number) => {
    const [details, credits, videos] = await Promise.all([
      fetchMovieDetails(movieId),
      fetchMovieCredits(movieId),
      fetchMovieVideos(movieId),
    ]);
    return { details, cast: credits.cast, videos: videos.results };
  }
);

/** Load genres list */
export const loadGenres = createAsyncThunk('movies/loadGenres', async () => {
  return await fetchGenres();
});

/** Discover movies with applied filters */
export const discoverMoviesThunk = createAsyncThunk(
  'movies/discoverMovies',
  async ({ filters, page }: { filters: MovieFilters; page: number }) => {
    const params: Record<string, unknown> = { page, sort_by: filters.sortBy };
    if (filters.genre) params.with_genres = String(filters.genre);
    if (filters.year) params.primary_release_year = filters.year;
    if (filters.minRating) params['vote_average.gte'] = filters.minRating;
    const data = await discoverMovies(params as Parameters<typeof discoverMovies>[0]);
    return { ...data, requestedPage: page };
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    /** Clear search state */
    clearSearch(state) {
      state.searchResults = [];
      state.searchQuery = '';
      state.searchPage = 0;
      state.searchTotalPages = 1;
    },

    /** Clear movie detail */
    clearDetail(state) {
      state.selectedMovie = null;
      state.selectedMovieCast = [];
      state.selectedMovieVideos = [];
    },

    /** Update filters */
    setFilters(state, action: PayloadAction<Partial<MovieFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      // Reset filtered results when filters change
      state.filteredMovies = [];
      state.filteredPage = 0;
    },

    /** Toggle a movie in favorites list */
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const movie = action.payload;
      const index = state.favorites.findIndex((f) => f.id === movie.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movie);
      }
      localStorage.setItem(
        'movie_explorer_favorites',
        JSON.stringify(state.favorites)
      );
    },

    /** Remove a movie from favorites */
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
      localStorage.setItem(
        'movie_explorer_favorites',
        JSON.stringify(state.favorites)
      );
    },

    /** Clear error state */
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // ── Trending ──
    builder
      .addCase(loadTrending.pending, (state) => {
        state.trendingLoading = true;
        state.error = null;
      })
      .addCase(loadTrending.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trending = [...state.trending, ...action.payload.results];
        state.trendingPage = action.payload.page;
        state.trendingTotalPages = action.payload.total_pages;
      })
      .addCase(loadTrending.rejected, (state, action) => {
        state.trendingLoading = false;
        state.error = action.error.message || 'Failed to load trending movies';
      });

    // ── Search ──
    builder
      .addCase(searchMoviesThunk.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchMoviesThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        const { results, total_pages, page, query, requestedPage } = action.payload;
        state.searchQuery = query;
        // Persist last search query
        localStorage.setItem('movie_explorer_last_search', query);
        if (requestedPage === 1) {
          state.searchResults = results;
        } else {
          state.searchResults = [...state.searchResults, ...results];
        }
        state.searchPage = page;
        state.searchTotalPages = total_pages;
      })
      .addCase(searchMoviesThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Search failed. Please try again.';
      });

    // ── Movie Detail ──
    builder
      .addCase(loadMovieDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(loadMovieDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedMovie = action.payload.details;
        state.selectedMovieCast = action.payload.cast;
        state.selectedMovieVideos = action.payload.videos;
      })
      .addCase(loadMovieDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message || 'Failed to load movie details';
      });

    // ── Genres ──
    builder
      .addCase(loadGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });

    // ── Discover ──
    builder
      .addCase(discoverMoviesThunk.pending, (state) => {
        state.filteredLoading = true;
        state.error = null;
      })
      .addCase(discoverMoviesThunk.fulfilled, (state, action) => {
        state.filteredLoading = false;
        const { results, total_pages, page, requestedPage } = action.payload;
        if (requestedPage === 1) {
          state.filteredMovies = results;
        } else {
          state.filteredMovies = [...state.filteredMovies, ...results];
        }
        state.filteredPage = page;
        state.filteredTotalPages = total_pages;
      })
      .addCase(discoverMoviesThunk.rejected, (state, action) => {
        state.filteredLoading = false;
        state.error = action.error.message || 'Failed to discover movies';
      });
  },
});

export const {
  clearSearch,
  clearDetail,
  setFilters,
  toggleFavorite,
  removeFavorite,
  clearError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
