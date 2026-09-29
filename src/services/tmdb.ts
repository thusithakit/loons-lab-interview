// =============================================================================
// TMDb API Service
// Centralizes all API calls with axios, handling auth and error formatting
// =============================================================================

import axios from 'axios';
import type {
  PaginatedResponse,
  Movie,
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  Genre,
} from '../types';

// Base axios instance configured from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

/** Image URL helpers */
export const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
export const getPosterUrl = (path: string | null, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;
export const getBackdropUrl = (path: string | null, size = 'w1280') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;
export const getProfileUrl = (path: string | null, size = 'w185') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

// ─── Trending ─────────────────────────────────────────────────────────────────

/** Fetch trending movies (day or week) */
export const fetchTrendingMovies = async (
  timeWindow: 'day' | 'week' = 'day',
  page = 1
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get<PaginatedResponse<Movie>>(
    `/trending/movie/${timeWindow}`,
    { params: { page } }
  );
  return data;
};

// ─── Search ───────────────────────────────────────────────────────────────────

/** Search movies by query string */
export const searchMovies = async (
  query: string,
  page = 1
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get<PaginatedResponse<Movie>>('/search/movie', {
    params: { query, page, include_adult: false },
  });
  return data;
};

// ─── Details, Credits & Videos ────────────────────────────────────────────────

/** Get full movie details */
export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const { data } = await api.get<MovieDetails>(`/movie/${movieId}`);
  return data;
};

/** Get movie credits (cast & crew) */
export const fetchMovieCredits = async (
  movieId: number
): Promise<CreditsResponse> => {
  const { data } = await api.get<CreditsResponse>(`/movie/${movieId}/credits`);
  return data;
};

/** Get movie videos (trailers, teasers, etc.) */
export const fetchMovieVideos = async (
  movieId: number
): Promise<VideosResponse> => {
  const { data } = await api.get<VideosResponse>(`/movie/${movieId}/videos`);
  return data;
};

// ─── Discovery & Genres ───────────────────────────────────────────────────────

/** Get full genre list for movies */
export const fetchGenres = async (): Promise<Genre[]> => {
  const { data } = await api.get<{ genres: Genre[] }>('/genre/movie/list');
  return data.genres;
};

/** Discover movies with filters (genre, year, rating, sort) */
export const discoverMovies = async (params: {
  page?: number;
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
  sort_by?: string;
}): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get<PaginatedResponse<Movie>>('/discover/movie', {
    params,
  });
  return data;
};

// ─── Similar & Recommendations ────────────────────────────────────────────────

/** Get similar movies */
export const fetchSimilarMovies = async (
  movieId: number,
  page = 1
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get<PaginatedResponse<Movie>>(
    `/movie/${movieId}/similar`,
    { params: { page } }
  );
  return data;
};

export default api;
