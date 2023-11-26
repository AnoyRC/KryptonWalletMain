"use client";

import { configureStore } from "@reduxjs/toolkit";
import setupReducer from "./slice/setupSlice";

export const store = configureStore({
  reducer: {
    setup: setupReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
