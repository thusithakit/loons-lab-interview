// =============================================================================
// Movie Saga - Async side-effect handlers with Redux Saga generator functions
// =============================================================================

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_TRENDING_REQUEST,
  SEARCH_MOVIES_REQUEST,
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_GENRES_REQUEST,
  DISCOVER_MOVIES_REQUEST,
  fetchTrendingSuccess,
  fetchTrendingFailure,
  searchMoviesSuccess,
  searchMoviesFailure,
  fetchMovieDetailSuccess,
  fetchMovieDetailFailure,
  fetchGenresSuccess,
  fetchGenresFailure,
  discoverMoviesSuccess,
  discoverMoviesFailure,
  type FetchTrendingRequestAction,
  type SearchMoviesRequestAction,
  type FetchMovieDetailRequestAction,
  type DiscoverMoviesRequestAction,
} from '../actions/movieActions';

import {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchGenres,
  discoverMovies,
} from '../../services/tmdb';

import type { PaginatedResponse, Movie, MovieDetails, CreditsResponse, VideosResponse, Genre } from '../../types';

// Worker Saga: Fetch Trending
function* handleFetchTrending(action: FetchTrendingRequestAction): Generator<unknown, void, PaginatedResponse<Movie>> {
  try {
    const data: PaginatedResponse<Movie> = yield call(fetchTrendingMovies, 'day', action.payload.page);
    yield put(fetchTrendingSuccess(data));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch trending movies';
    yield put(fetchTrendingFailure(message));
  }
}

// Worker Saga: Search Movies
function* handleSearchMovies(action: SearchMoviesRequestAction): Generator<unknown, void, PaginatedResponse<Movie>> {
  try {
    const data: PaginatedResponse<Movie> = yield call(searchMovies, action.payload.query, action.payload.page);
    yield put(searchMoviesSuccess({ ...data, query: action.payload.query }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Search failed. Please try again.';
    yield put(searchMoviesFailure(message));
  }
}

// Worker Saga: Fetch Movie Detail
function* handleFetchMovieDetail(action: FetchMovieDetailRequestAction): Generator<
  unknown,
  void,
  [MovieDetails, CreditsResponse, VideosResponse]
> {
  try {
    const movieId = action.payload;
    const [details, credits, videos]: [MovieDetails, CreditsResponse, VideosResponse] = yield call(() =>
      Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieCredits(movieId),
        fetchMovieVideos(movieId),
      ])
    );
    yield put(
      fetchMovieDetailSuccess({
        details,
        cast: credits.cast,
        videos: videos.results,
      })
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to load movie details';
    yield put(fetchMovieDetailFailure(message));
  }
}

// Worker Saga: Fetch Genres
function* handleFetchGenres(): Generator<unknown, void, Genre[]> {
  try {
    const genres: Genre[] = yield call(fetchGenres);
    yield put(fetchGenresSuccess(genres));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch genres';
    yield put(fetchGenresFailure(message));
  }
}

// Worker Saga: Discover Movies with filters
function* handleDiscoverMovies(action: DiscoverMoviesRequestAction): Generator<unknown, void, PaginatedResponse<Movie>> {
  try {
    const { filters, page } = action.payload;
    const params: Record<string, unknown> = {
      page,
      sort_by: filters.sortBy || 'popularity.desc',
    };
    if (filters.genre) {
      params.with_genres = String(filters.genre);
    }
    if (filters.year) {
      params.primary_release_year = filters.year;
    }
    if (filters.minRating && filters.minRating > 0) {
      params['vote_average.gte'] = filters.minRating;
      params['vote_count.gte'] = 5; // ensure valid vote threshold for filtered rating
    }

    const data: PaginatedResponse<Movie> = yield call(discoverMovies, params as Parameters<typeof discoverMovies>[0]);
    yield put(discoverMoviesSuccess(data));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to discover movies';
    yield put(discoverMoviesFailure(message));
  }
}

// Watcher Saga
export function* movieSaga() {
  yield takeLatest(FETCH_TRENDING_REQUEST, handleFetchTrending);
  yield takeLatest(SEARCH_MOVIES_REQUEST, handleSearchMovies);
  yield takeLatest(FETCH_MOVIE_DETAIL_REQUEST, handleFetchMovieDetail);
  yield takeEvery(FETCH_GENRES_REQUEST, handleFetchGenres);
  yield takeLatest(DISCOVER_MOVIES_REQUEST, handleDiscoverMovies);
}
