import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    currertContact: null,
  },

  reducers: {
    setCurrertContact: (state, action) => {
      state.currertContact = action.payload;
    },

    resetContacts: (state) => {
      state.currertContact = null;
    },
  },
});

export const { setCurrertContact, resetContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
