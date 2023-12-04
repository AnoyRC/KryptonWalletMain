import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',

  initialState: {
    openAddContact: false,
  },

  reducers: {
    toggleAddContactModal: (state, action) => {
      state.openAddContact = action.payload;
    },
  },
});

export const { toggleAddContactModal } = modalsSlice.actions;

export default modalsSlice.reducer;
