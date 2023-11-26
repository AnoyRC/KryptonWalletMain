import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
  name: "setup",
  initialState: {
    activeStep: 0,
    name: "",
    guardians: [{ name: "", address: "" }],
    chain: "1",
  },

  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    addGuardian: (state, action) => {
      state.guardians.push(action.payload);
    },
    editGuardianName: (state, action) => {
      state.guardians[action.payload.index].name = action.payload.name;
    },
    editGuardianAddress: (state, action) => {
      state.guardians[action.payload.index].address = action.payload.address;
    },
    removeGuardian: (state, action) => {
      state.guardians.pop();
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setChain: (state, action) => {
      state.chain = action.payload;
    },
  },
});

export const {
  setActiveStep,
  addGuardian,
  editGuardianName,
  editGuardianAddress,
  removeGuardian,
  setName,
  setChain,
} = setupSlice.actions;

export default setupSlice.reducer;
