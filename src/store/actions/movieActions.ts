// =============================================================================
// Movie Action Types & Creators (Redux Saga Pattern)
// =============================================================================

import type { Movie, MovieDetails, CastMember, Video, Genre, MovieFilters } from '../../types';

// Action Constants
export const FETCH_TRENDING_REQUEST = 'movies/FETCH_TRENDING_REQUEST';
export const FETCH_TRENDING_SUCCESS = 'movies/FETCH_TRENDING_SUCCESS';
export const FETCH_TRENDING_FAILURE = 'movies/FETCH_TRENDING_FAILURE';

export const SEARCH_MOVIES_REQUEST = 'movies/SEARCH_MOVIES_REQUEST';
export const SEARCH_MOVIES_SUCCESS = 'movies/SEARCH_MOVIES_SUCCESS';
export const SEARCH_MOVIES_FAILURE = 'movies/SEARCH_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAIL_REQUEST = 'movies/FETCH_MOVIE_DETAIL_REQUEST';
export const FETCH_MOVIE_DETAIL_SUCCESS = 'movies/FETCH_MOVIE_DETAIL_SUCCESS';
export const FETCH_MOVIE_DETAIL_FAILURE = 'movies/FETCH_MOVIE_DETAIL_FAILURE';

export const FETCH_GENRES_REQUEST = 'movies/FETCH_GENRES_REQUEST';
export const FETCH_GENRES_SUCCESS = 'movies/FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'movies/FETCH_GENRES_FAILURE';

export const DISCOVER_MOVIES_REQUEST = 'movies/DISCOVER_MOVIES_REQUEST';
export const DISCOVER_MOVIES_SUCCESS = 'movies/DISCOVER_MOVIES_SUCCESS';
export const DISCOVER_MOVIES_FAILURE = 'movies/DISCOVER_MOVIES_FAILURE';

export const TOGGLE_FAVORITE = 'movies/TOGGLE_FAVORITE';
export const REMOVE_FAVORITE = 'movies/REMOVE_FAVORITE';
export const SET_FILTERS = 'movies/SET_FILTERS';
export const CLEAR_SEARCH = 'movies/CLEAR_SEARCH';
export const CLEAR_DETAIL = 'movies/CLEAR_DETAIL';
export const CLEAR_ERROR = 'movies/CLEAR_ERROR';

// Action Interfaces
export interface FetchTrendingRequestAction {
  type: typeof FETCH_TRENDING_REQUEST;
  payload: { page: number };
}

export interface FetchTrendingSuccessAction {
  type: typeof FETCH_TRENDING_SUCCESS;
  payload: { results: Movie[]; page: number; total_pages: number };
}

export interface FetchTrendingFailureAction {
  type: typeof FETCH_TRENDING_FAILURE;
  payload: string;
}

export interface SearchMoviesRequestAction {
  type: typeof SEARCH_MOVIES_REQUEST;
  payload: { query: string; page: number };
}

export interface SearchMoviesSuccessAction {
  type: typeof SEARCH_MOVIES_SUCCESS;
  payload: { results: Movie[]; page: number; total_pages: number; query: string };
}

export interface SearchMoviesFailureAction {
  type: typeof SEARCH_MOVIES_FAILURE;
  payload: string;
}

export interface FetchMovieDetailRequestAction {
  type: typeof FETCH_MOVIE_DETAIL_REQUEST;
  payload: number; // movieId
}

export interface FetchMovieDetailSuccessAction {
  type: typeof FETCH_MOVIE_DETAIL_SUCCESS;
  payload: { details: MovieDetails; cast: CastMember[]; videos: Video[] };
}

export interface FetchMovieDetailFailureAction {
  type: typeof FETCH_MOVIE_DETAIL_FAILURE;
  payload: string;
}

export interface FetchGenresRequestAction {
  type: typeof FETCH_GENRES_REQUEST;
}

export interface FetchGenresSuccessAction {
  type: typeof FETCH_GENRES_SUCCESS;
  payload: Genre[];
}

export interface FetchGenresFailureAction {
  type: typeof FETCH_GENRES_FAILURE;
  payload: string;
}

export interface DiscoverMoviesRequestAction {
  type: typeof DISCOVER_MOVIES_REQUEST;
  payload: { filters: MovieFilters; page: number };
}

export interface DiscoverMoviesSuccessAction {
  type: typeof DISCOVER_MOVIES_SUCCESS;
  payload: { results: Movie[]; page: number; total_pages: number };
}

export interface DiscoverMoviesFailureAction {
  type: typeof DISCOVER_MOVIES_FAILURE;
  payload: string;
}

export interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: Movie;
}

export interface RemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: number;
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  payload: Partial<MovieFilters>;
}

export interface ClearSearchAction {
  type: typeof CLEAR_SEARCH;
}

export interface ClearDetailAction {
  type: typeof CLEAR_DETAIL;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type MovieActionTypes =
  | FetchTrendingRequestAction
  | FetchTrendingSuccessAction
  | FetchTrendingFailureAction
  | SearchMoviesRequestAction
  | SearchMoviesSuccessAction
  | SearchMoviesFailureAction
  | FetchMovieDetailRequestAction
  | FetchMovieDetailSuccessAction
  | FetchMovieDetailFailureAction
  | FetchGenresRequestAction
  | FetchGenresSuccessAction
  | FetchGenresFailureAction
  | DiscoverMoviesRequestAction
  | DiscoverMoviesSuccessAction
  | DiscoverMoviesFailureAction
  | ToggleFavoriteAction
  | RemoveFavoriteAction
  | SetFiltersAction
  | ClearSearchAction
  | ClearDetailAction
  | ClearErrorAction;

// Action Creators
export const fetchTrendingRequest = (page = 1): FetchTrendingRequestAction => ({
  type: FETCH_TRENDING_REQUEST,
  payload: { page },
});

export const fetchTrendingSuccess = (data: {
  results: Movie[];
  page: number;
  total_pages: number;
}): FetchTrendingSuccessAction => ({
  type: FETCH_TRENDING_SUCCESS,
  payload: data,
});

export const fetchTrendingFailure = (error: string): FetchTrendingFailureAction => ({
  type: FETCH_TRENDING_FAILURE,
  payload: error,
});

export const searchMoviesRequest = (
  query: string,
  page = 1
): SearchMoviesRequestAction => ({
  type: SEARCH_MOVIES_REQUEST,
  payload: { query, page },
});

export const searchMoviesSuccess = (data: {
  results: Movie[];
  page: number;
  total_pages: number;
  query: string;
}): SearchMoviesSuccessAction => ({
  type: SEARCH_MOVIES_SUCCESS,
  payload: data,
});

export const searchMoviesFailure = (error: string): SearchMoviesFailureAction => ({
  type: SEARCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchMovieDetailRequest = (movieId: number): FetchMovieDetailRequestAction => ({
  type: FETCH_MOVIE_DETAIL_REQUEST,
  payload: movieId,
});

export const fetchMovieDetailSuccess = (data: {
  details: MovieDetails;
  cast: CastMember[];
  videos: Video[];
}): FetchMovieDetailSuccessAction => ({
  type: FETCH_MOVIE_DETAIL_SUCCESS,
  payload: data,
});

export const fetchMovieDetailFailure = (error: string): FetchMovieDetailFailureAction => ({
  type: FETCH_MOVIE_DETAIL_FAILURE,
  payload: error,
});

export const fetchGenresRequest = (): FetchGenresRequestAction => ({
  type: FETCH_GENRES_REQUEST,
});

export const fetchGenresSuccess = (genres: Genre[]): FetchGenresSuccessAction => ({
  type: FETCH_GENRES_SUCCESS,
  payload: genres,
});

export const fetchGenresFailure = (error: string): FetchGenresFailureAction => ({
  type: FETCH_GENRES_FAILURE,
  payload: error,
});

export const discoverMoviesRequest = (
  filters: MovieFilters,
  page = 1
): DiscoverMoviesRequestAction => ({
  type: DISCOVER_MOVIES_REQUEST,
  payload: { filters, page },
});

export const discoverMoviesSuccess = (data: {
  results: Movie[];
  page: number;
  total_pages: number;
}): DiscoverMoviesSuccessAction => ({
  type: DISCOVER_MOVIES_SUCCESS,
  payload: data,
});

export const discoverMoviesFailure = (error: string): DiscoverMoviesFailureAction => ({
  type: DISCOVER_MOVIES_FAILURE,
  payload: error,
});

export const toggleFavorite = (movie: Movie): ToggleFavoriteAction => ({
  type: TOGGLE_FAVORITE,
  payload: movie,
});

export const removeFavorite = (movieId: number): RemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: movieId,
});

export const setFilters = (filters: Partial<MovieFilters>): SetFiltersAction => ({
  type: SET_FILTERS,
  payload: filters,
});

export const clearSearch = (): ClearSearchAction => ({
  type: CLEAR_SEARCH,
});

export const clearDetail = (): ClearDetailAction => ({
  type: CLEAR_DETAIL,
});

export const clearError = (): ClearErrorAction => ({
  type: CLEAR_ERROR,
});
