import { AttractionsRounded } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionComponent } from "react";
import { RootState } from ".";

// Define a type for the slice state
interface uiState {
  modalContent: string | Element | JSX.Element | FunctionComponent;
  modalStyles: {};
  modalOpened: boolean;
  drawerContent: string;
  drawerStyles: {
    fontWeight: number;
    color: string;
  };
  drawerOpened: boolean;
  loaderOpened: boolean;
}
// Define the initial state using that type
const initialState: uiState = {
  modalContent: "",
  modalStyles: {},
  modalOpened: false,
  drawerContent: "",
  drawerStyles: {
    fontWeight: 800,
    color: "white",
  },
  drawerOpened: false,
  loaderOpened: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModalAndSetContent(state, action: PayloadAction<any>) {
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
    openDrawerAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        drawerOpened: true,
        drawerContent: action.payload.drawerContent,
      };
    },
    closedrawer(state) {
      return { ...state, drawerOpened: false };
    },
    openLoader(state, action) {
      state.loaderOpened = action.payload;
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice;
