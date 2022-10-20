import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modalContent: "",
    modalStyles: {
      fontWeight: 800,
      color: "white",
    },
    modalOpened: false,
  },
  reducers: {
    openModalAndSetContent(state, action) {
      return {
        ...state,
        modalOpened: true,
        modalContent: action.payload.modalContent,
        modalStyles: { ...state.modalStyles, ...action.payload.modalStyles },
      };
    },
    closeModal(state) {
      return { ...state, modalOpened: false };
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice;
