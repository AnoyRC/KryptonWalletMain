import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    pushSign: null,
    currertContact: null,
  },

  reducers: {
    setPushSign: (state, action) => {
      state.pushSign = action.payload;
    },

    setCurrertContact: (state, action) => {
      state.currertContact = action.payload;
    },

    resetContacts: (state) => {
      state.currertContact = null;
      state.pushSign = null;
    },
  },
});

export const { setPushSign, setCurrertContact, resetContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
