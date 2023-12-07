import { createSlice } from "@reduxjs/toolkit";

const sigManagerSlice = createSlice({
  name: "sigManager",
  initialState: {
    drawer: false,
    signature: "",
    signDrawer: false,
    initiateDrawer: false,
    initiateWalletAddress: "",
    intiateChainId: "",
  },

  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },

    closeDrawer: (state) => {
      state.drawer = false;
    },

    toggleSignDrawer: (state, action) => {
      state.signDrawer = action.payload;
    },

    setSignature: (state, action) => {
      state.signature = action.payload;
    },

    openInitiateDrawer: (state) => {
      state.initiateDrawer = true;
      state.drawer = true;
    },

    closeInitiateDrawer: (state) => {
      state.initiateDrawer = false;
      state.drawer = false;
    },

    setInitiateWalletAddress: (state, action) => {
      state.initiateWalletAddress = action.payload;
    },

    setInitiateChainId: (state, action) => {
      state.intiateChainId = action.payload;
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  setSignature,
  toggleSignDrawer,
  openInitiateDrawer,
  closeInitiateDrawer,
  setInitiateWalletAddress,
  setInitiateChainId,
} = sigManagerSlice.actions;

export default sigManagerSlice.reducer;
