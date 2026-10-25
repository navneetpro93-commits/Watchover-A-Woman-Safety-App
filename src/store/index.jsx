import { configureStore } from '@reduxjs/toolkit';
import safetyKitReducer from './safetyKitSlice';

/**
 * Redux Toolkit Centralized Store (CE2 Syllabus)
 * Demonstrates:
 * 1. configureStore with modular slice reducers
 * 2. Single source of truth for global shopping cart & safety toolkit
 * 3. Immutable state modifications via Immer (built into RTK)
 */
export const store = configureStore({
  reducer: {
    safetyKit: safetyKitReducer
  }
});

export default store;
