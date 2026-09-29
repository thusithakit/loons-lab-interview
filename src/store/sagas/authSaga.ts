// =============================================================================
// Auth Saga - handles login request side-effects
// =============================================================================

import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, type LoginRequestAction } from '../actions/authActions';

function* handleLogin(action: LoginRequestAction) {
  // Simulate auth latency if needed, then dispatch loginSuccess
  yield put(loginSuccess(action.payload));
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
