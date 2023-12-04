"use client";

import { configureStore } from "@reduxjs/toolkit";

import setupReducer from "./slice/setupSlice";
import sigManagerReducer from "./slice/sigManagerSlice";
import contactReducer from "./slice/contactsSlice";
import modalsReducer from "./slice/modalsSlice";
import balanceReducer from "./slice/balanceSlice";

export const store = configureStore({
  reducer: {
    setup: setupReducer,
    sigManager: sigManagerReducer,
    contacts: contactReducer,
    modals: modalsReducer,
    balance: balanceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
