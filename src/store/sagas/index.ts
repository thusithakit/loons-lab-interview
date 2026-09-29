// =============================================================================
// Root Saga — Combines all watcher sagas
// =============================================================================

import { all, fork } from 'redux-saga/effects';
import { movieSaga } from './movieSaga';
import { authSaga } from './authSaga';

export function* rootSaga() {
  yield all([
    fork(movieSaga),
    fork(authSaga),
  ]);
}
