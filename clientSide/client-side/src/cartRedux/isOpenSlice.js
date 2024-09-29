import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = isOpenSlice.actions;

export default isOpenSlice.reducer;
