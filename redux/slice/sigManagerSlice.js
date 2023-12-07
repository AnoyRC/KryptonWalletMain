import { createSlice } from '@reduxjs/toolkit';

const sigManagerSlice = createSlice({
  name: 'sigManager',
  initialState: {
    drawer: false,
    signature: '',
    signDrawer: false,
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
  },
});

export const { openDrawer, closeDrawer, setSignature, toggleSignDrawer } =
  sigManagerSlice.actions;

export default sigManagerSlice.reducer;
