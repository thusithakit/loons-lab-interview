# 🎬 Movie Explorer

A modern, responsive movie exploration web app built with React, TypeScript, and Material-UI. Discover trending films, search for movies, view detailed information with trailers, and save your favorites - all powered by the TMDb API.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MUI](https://img.shields.io/badge/MUI-9-purple?logo=mui)
![Vite](https://img.shields.io/badge/Vite-8-yellow?logo=vite)

---

## ✨ Features

### Core Features

- **🔐 User Authentication** - Login interface with form validation and session persistence via localStorage
- **🔍 Movie Search** - Real-time search with debounced API calls and paginated results
- **🔥 Trending Movies** - Displays popular movies from TMDb with a hero banner
- **📋 Movie Details** - Full detail view with poster, overview, genres, cast, budget/revenue, and embedded YouTube trailer
- **❤️ Favorites** - Save/remove movies to a locally persisted favorites list
- **🌓 Light/Dark Mode** - Toggle between a cinematic dark theme and clean light theme
- **📱 Responsive Design** - Mobile-first layout that works seamlessly across all screen sizes

### Bonus Features

- **🎯 Genre/Year/Rating Filters** - Discover movies filtered by genre, release year, minimum rating, and sort order
- **🎬 YouTube Trailers** - Embedded trailer player directly on the movie detail page
- **📄 Load More Pagination** - "Load More" button for better UX instead of infinite scroll

---

## 🛠 Tech Stack

| Technology              | Purpose                     |
| ----------------------- | --------------------------- |
| **React 19**            | UI framework                |
| **TypeScript**          | Type safety                 |
| **Vite**                | Build tool & dev server     |
| **Material-UI (MUI) 9** | Component library & styling |
| **Redux Toolkit**       | State management            |
| **React Router 8**      | Client-side routing         |
| **Axios**               | HTTP API client             |
| **TMDb API**            | Movie data source           |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorAlert/      # Error notification snackbar
│   ├── FilterBar/       # Genre, year, rating, sort filters
│   ├── HeroSection/     # Hero banner with featured movie
│   ├── MovieCard/       # Movie poster card with rating & favorite
│   ├── MovieGrid/       # Responsive grid layout with Load More
│   └── Navbar/          # App header with search, nav, theme toggle
├── hooks/               # Custom React hooks
│   └── useRedux.ts      # Typed Redux dispatch & selector hooks
├── pages/               # Route-level page components
│   ├── FavoritesPage/   # User's saved favorite movies
│   ├── HomePage/        # Landing page with hero, trending, & filters
│   ├── LoginPage/       # Authentication form
│   ├── MovieDetailPage/ # Full movie detail with cast & trailer
│   └── SearchPage/      # Search results with Load More
├── services/            # API service layer
│   └── tmdb.ts          # TMDb API endpoints with axios
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup & typed exports
│   └── slices/          # Redux slices
│       ├── authSlice.ts    # Authentication state
│       ├── moviesSlice.ts  # Movie data, search, favorites
│       └── themeSlice.ts   # Light/dark mode
├── theme/               # MUI theme configuration
│   └── index.ts         # Dark & light theme definitions
├── types/               # TypeScript type definitions
│   └── index.ts         # TMDb API types & app interfaces
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- A free **TMDb API key** - [Get one here](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd loons-lab-interview
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Open `.env` and replace `YOUR_TMDB_API_KEY_HERE` with your actual TMDb API key:

   ```env
   VITE_TMDB_API_KEY=your_actual_api_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 API Usage

This app uses the [TMDb API v3](https://developers.themoviedb.org/3). The following endpoints are used:

| Endpoint                            | Purpose                      |
| ----------------------------------- | ---------------------------- |
| `GET /trending/movie/{time_window}` | Fetch trending movies        |
| `GET /search/movie`                 | Search movies by title       |
| `GET /movie/{movie_id}`             | Get movie details            |
| `GET /movie/{movie_id}/credits`     | Get movie cast & crew        |
| `GET /movie/{movie_id}/videos`      | Get movie trailers           |
| `GET /genre/movie/list`             | Get list of genres           |
| `GET /discover/movie`               | Discover movies with filters |
| `GET /movie/{movie_id}/similar`     | Get similar movies           |

**Rate Limiting:** TMDb allows 40 requests per 10 seconds. The app handles API errors gracefully with user-friendly messages and retry options.

---

## 🗂 State Management

The app uses **Redux Toolkit** for state management with three slices:

- **`authSlice`** - User authentication state, persisted to `localStorage`
- **`moviesSlice`** - Trending, search results, movie details, favorites (persisted to `localStorage`), genres, and filters
- **`themeSlice`** - Light/dark mode preference, persisted to `localStorage`

### localStorage Keys

| Key                          | Data                           |
| ---------------------------- | ------------------------------ |
| `movie_explorer_user`        | Authenticated user object      |
| `movie_explorer_favorites`   | Array of favorited movies      |
| `movie_explorer_last_search` | Last search query string       |
| `movie_explorer_theme`       | Theme mode (`light` or `dark`) |

---

## 🌐 Deployment

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload the `dist/` folder to Netlify
```

---

## 📄 License

This project is created for the Loons Lab internship assessment.
