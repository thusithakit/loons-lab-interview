/** A single genre object returned by TMDb */
export interface Genre {
  id: number;
  name: string;
}

/** A single movie in a list response (search, trending, discover) */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

/** Cast member from credits endpoint */
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

/** Crew member from credits endpoint */
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

/** Video result (trailers, teasers, etc.) */
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
}

/** Full movie details from /movie/{id} endpoint */
export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: Genre[];
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}

/** Paginated list response from TMDb */
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Credits response shape */
export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

/** Videos response shape */
export interface VideosResponse {
  id: number;
  results: Video[];
}

/** User credentials for login */
export interface UserCredentials {
  username: string;
  password: string;
}

/** Authenticated user stored in state */
export interface User {
  username: string;
  isAuthenticated: boolean;
}

/** Filter options for movie discovery */
export interface MovieFilters {
  genre: number | null;
  year: number | null;
  minRating: number | null;
  sortBy: string;
}
