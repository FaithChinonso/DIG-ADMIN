import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    page: "General Administration",
    section: "Dashboard",
  },
  reducers: {
    addPage(state, action) {
      state.page = action.payload;
    },
    addSection(state, action) {
      state.section = action.payload;
    },
  },
});
export const dataActions = dataSlice.actions;

export default dataSlice;
