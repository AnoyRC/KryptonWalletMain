import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    pushSign: null,
    currentContact: null,
  },

  reducers: {
    setPushSign: (state, action) => {
      state.pushSign = action.payload;
    },

    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },

    resetContacts: (state) => {
      state.currentContact = null;
      state.pushSign = null;
    },
  },
});

export const { setPushSign, setCurrentContact, resetContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
