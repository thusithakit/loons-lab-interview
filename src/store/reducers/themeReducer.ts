// =============================================================================
// Theme Reducer
// =============================================================================

import { TOGGLE_THEME, type ThemeActionTypes } from '../actions/themeActions';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

const storedMode = localStorage.getItem('movie_explorer_theme') as ThemeMode | null;

const initialState: ThemeState = {
  mode: storedMode || 'dark',
};

export const themeReducer = (
  state = initialState,
  action: ThemeActionTypes
): ThemeState => {
  switch (action.type) {
    case TOGGLE_THEME: {
      const nextMode: ThemeMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('movie_explorer_theme', nextMode);
      return { ...state, mode: nextMode };
    }
    default:
      return state;
  }
};
