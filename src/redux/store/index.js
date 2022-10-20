import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import dataSlice from "./data-slice";
// import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
    // auth: authSlice.reducer,
  },
});

export default store;
