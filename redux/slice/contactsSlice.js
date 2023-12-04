import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    pushSign: null,
    currentContact: null,
    recentContact: null,
  },

  reducers: {
    setPushSign: (state, action) => {
      state.pushSign = action.payload;
    },

    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },

    setRecentContact: (state, action) => {
      state.recentContact = action.payload;
    },

    resetContacts: (state) => {
      state.currentContact = null;
      state.pushSign = null;
    },
  },
});

export const {
  setPushSign,
  setCurrentContact,
  setRecentContact,
  resetContacts,
} = contactsSlice.actions;

export default contactsSlice.reducer;
