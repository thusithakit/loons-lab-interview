export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT = 'auth/LOGOUT';

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: string; // username
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string; // username
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginRequestAction | LoginSuccessAction | LogoutAction;

export const loginRequest = (username: string): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: username,
});

export const loginSuccess = (username: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: username,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
