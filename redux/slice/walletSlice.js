import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",

  initialState: {
    status: "Good",
    isOwner: false,
    isGuardian: false,
  },

  reducers: {
    setWalletStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setIsGuardian: (state, action) => {
      state.isGuardian = action.payload;
    },
  },
});

export const { setWalletStatus, setIsOwner, setIsGuardian } =
  walletSlice.actions;

export default walletSlice.reducer;
