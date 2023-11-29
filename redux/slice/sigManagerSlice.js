import { createSlice } from "@reduxjs/toolkit";

const sigManagerSlice = createSlice({
  name: "sigManager",
  initialState: {
    drawer: false,
    signature: "",
  },

  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
    setSignature: (state, action) => {
      state.signature = action.payload;
    },
  },
});

export const { openDrawer, closeDrawer, setSignature } =
  sigManagerSlice.actions;

export default sigManagerSlice.reducer;
