// =============================================================================
// App Root - Router setup with Redux Provider & ThemeProvider
// =============================================================================

import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './hooks/useRedux';
import { darkTheme, lightTheme } from './theme';

// Pages
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

// Components
import MainLayout from './components/MainLayout';
import FilterSidebar from './components/FilterSidebar';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppInner() {
  const themeMode = useAppSelector((s) => s.theme.mode);
  const theme = useMemo(
    () => (themeMode === 'dark' ? darkTheme : lightTheme),
    [themeMode]
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <HomePage onOpenFilterSidebar={() => setSidebarOpen(true)} />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SearchPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MovieDetailPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <FavoritesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <FilterSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
