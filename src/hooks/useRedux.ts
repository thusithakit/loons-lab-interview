// =============================================================================
// Typed Redux Hooks
// Provides type-safe useDispatch and useSelector throughout the app
// =============================================================================

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

/** Type-safe dispatch hook */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** Type-safe selector hook */
export const useAppSelector = useSelector.withTypes<RootState>();
