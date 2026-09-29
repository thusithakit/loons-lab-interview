// =============================================================================
// Theme Slice — manages light/dark mode toggle
// Persists preference to localStorage
// =============================================================================

import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const storedMode = localStorage.getItem('movie_explorer_theme') as ThemeMode | null;

const initialState: ThemeState = {
  mode: storedMode || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('movie_explorer_theme', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
