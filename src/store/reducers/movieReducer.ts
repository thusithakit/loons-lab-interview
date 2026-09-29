// =============================================================================
// Movie Reducer
// =============================================================================

import type { Movie, MovieDetails, CastMember, Video, Genre, MovieFilters } from '../../types';
import {
  FETCH_TRENDING_REQUEST,
  FETCH_TRENDING_SUCCESS,
  FETCH_TRENDING_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAILURE,
  FETCH_GENRES_SUCCESS,
  DISCOVER_MOVIES_REQUEST,
  DISCOVER_MOVIES_SUCCESS,
  DISCOVER_MOVIES_FAILURE,
  TOGGLE_FAVORITE,
  REMOVE_FAVORITE,
  SET_FILTERS,
  CLEAR_SEARCH,
  CLEAR_DETAIL,
  CLEAR_ERROR,
  type MovieActionTypes,
} from '../actions/movieActions';

export interface MoviesState {
  trending: Movie[];
  trendingPage: number;
  trendingTotalPages: number;
  trendingLoading: boolean;

  searchResults: Movie[];
  searchQuery: string;
  searchPage: number;
  searchTotalPages: number;
  searchLoading: boolean;

  selectedMovie: MovieDetails | null;
  selectedMovieCast: CastMember[];
  selectedMovieVideos: Video[];
  detailLoading: boolean;

  genres: Genre[];
  genresLoaded: boolean;

  filters: MovieFilters;
  filteredMovies: Movie[];
  filteredPage: number;
  filteredTotalPages: number;
  filteredLoading: boolean;

  favorites: Movie[];
  error: string | null;
}

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

export const movieReducer = (
  state = initialState,
  action: MovieActionTypes
): MoviesState => {
  switch (action.type) {
    // Trending
    case FETCH_TRENDING_REQUEST:
      return { ...state, trendingLoading: true, error: null };
    case FETCH_TRENDING_SUCCESS:
      return {
        ...state,
        trendingLoading: false,
        trending: action.payload.page === 1 ? action.payload.results : [...state.trending, ...action.payload.results],
        trendingPage: action.payload.page,
        trendingTotalPages: action.payload.total_pages,
      };
    case FETCH_TRENDING_FAILURE:
      return { ...state, trendingLoading: false, error: action.payload };

    // Search
    case SEARCH_MOVIES_REQUEST:
      return { ...state, searchLoading: true, error: null };
    case SEARCH_MOVIES_SUCCESS: {
      const { results, page, total_pages, query } = action.payload;
      localStorage.setItem('movie_explorer_last_search', query);
      return {
        ...state,
        searchLoading: false,
        searchQuery: query,
        searchResults: page === 1 ? results : [...state.searchResults, ...results],
        searchPage: page,
        searchTotalPages: total_pages,
      };
    }
    case SEARCH_MOVIES_FAILURE:
      return { ...state, searchLoading: false, error: action.payload };

    // Movie Detail
    case FETCH_MOVIE_DETAIL_REQUEST:
      return { ...state, detailLoading: true, error: null };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        selectedMovie: action.payload.details,
        selectedMovieCast: action.payload.cast,
        selectedMovieVideos: action.payload.videos,
      };
    case FETCH_MOVIE_DETAIL_FAILURE:
      return { ...state, detailLoading: false, error: action.payload };

    // Genres
    case FETCH_GENRES_SUCCESS:
      return { ...state, genres: action.payload, genresLoaded: true };

    // Discover
    case DISCOVER_MOVIES_REQUEST:
      return { ...state, filteredLoading: true, error: null };
    case DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        filteredLoading: false,
        filteredMovies: action.payload.page === 1 ? action.payload.results : [...state.filteredMovies, ...action.payload.results],
        filteredPage: action.payload.page,
        filteredTotalPages: action.payload.total_pages,
      };
    case DISCOVER_MOVIES_FAILURE:
      return { ...state, filteredLoading: false, error: action.payload };

    // Favorites
    case TOGGLE_FAVORITE: {
      const movie = action.payload;
      const index = state.favorites.findIndex((f) => f.id === movie.id);
      const updatedFavs = index >= 0
        ? state.favorites.filter((f) => f.id !== movie.id)
        : [...state.favorites, movie];
      localStorage.setItem('movie_explorer_favorites', JSON.stringify(updatedFavs));
      return { ...state, favorites: updatedFavs };
    }
    case REMOVE_FAVORITE: {
      const updatedFavs = state.favorites.filter((f) => f.id !== action.payload);
      localStorage.setItem('movie_explorer_favorites', JSON.stringify(updatedFavs));
      return { ...state, favorites: updatedFavs };
    }

    // Utility actions
    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        filteredMovies: [],
        filteredPage: 0,
      };
    case CLEAR_SEARCH:
      return { ...state, searchResults: [], searchQuery: '', searchPage: 0, searchTotalPages: 1 };
    case CLEAR_DETAIL:
      return { ...state, selectedMovie: null, selectedMovieCast: [], selectedMovieVideos: [] };
    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
