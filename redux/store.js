"use client";

import { configureStore } from "@reduxjs/toolkit";
import setupReducer from "./slice/setupSlice";
import sigManagerReducer from "./slice/sigManagerSlice";

export const store = configureStore({
  reducer: {
    setup: setupReducer,
    sigManager: sigManagerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
