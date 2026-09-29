// =============================================================================
// Root Reducer
// =============================================================================

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { movieReducer } from './movieReducer';
import { themeReducer } from './themeReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
