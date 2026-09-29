// =============================================================================
// Auth Slice — manages user authentication state
// Uses localStorage for persistence across sessions
// =============================================================================

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
}

// Rehydrate from localStorage on load
const storedUser = localStorage.getItem('movie_explorer_user');
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Logs the user in and persists to localStorage */
    login(state, action: PayloadAction<string>) {
      state.user = { username: action.payload, isAuthenticated: true };
      localStorage.setItem('movie_explorer_user', JSON.stringify(state.user));
    },
    /** Clears auth state and localStorage */
    logout(state) {
      state.user = null;
      localStorage.removeItem('movie_explorer_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
