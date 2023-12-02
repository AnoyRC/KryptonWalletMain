'use client';

import { configureStore } from '@reduxjs/toolkit';

import setupReducer from './slice/setupSlice';
import sigManagerReducer from './slice/sigManagerSlice';
import contactReducer from './slice/contactsSlice';

export const store = configureStore({
  reducer: {
    setup: setupReducer,
    sigManager: sigManagerReducer,
    contacts: contactReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
