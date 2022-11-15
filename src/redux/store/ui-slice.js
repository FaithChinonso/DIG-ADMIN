import { AttractionsRounded } from "@mui/icons-material";
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
    toastContent: "",
    toastStyles: {
      fontWeight: 800,
      color: "white",
    },
    toastOpened: false,
    loaderOpened: false,
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
    openLoader(state, action) {
      state.loaderOpened = action.payload;
    },
  },
  openToastAndSetContent(state, action) {
    return {
      ...state,
      toastOpened: true,
      toastContent: action.payload.toastContent,
      toastStyles: { ...state.toastStyles, ...action.payload.toastStyles },
    };
  },
  closeToast(state) {
    return { ...state, toastOpened: false };
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice;
