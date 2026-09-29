import type { User } from '../../types';
import { LOGIN_SUCCESS, LOGOUT, type AuthActionTypes } from '../actions/authActions';

export interface AuthState {
  user: User | null;
}

const storedUser = localStorage.getItem('movie_explorer_user');
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const user = { username: action.payload, isAuthenticated: true };
      localStorage.setItem('movie_explorer_user', JSON.stringify(user));
      return { ...state, user };
    }
    case LOGOUT: {
      localStorage.removeItem('movie_explorer_user');
      return { ...state, user: null };
    }
    default:
      return state;
  }
};
