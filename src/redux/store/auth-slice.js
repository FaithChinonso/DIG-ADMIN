import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:
      typeof window === "undefined"
        ? ""
        : sessionStorage.getItem("accessToken"),

    adminDetails:
      typeof window === "undefined"
        ? ""
        : JSON.parse(sessionStorage.getItem("adminDetails")),
  },
  reducers: {
    loginHandler(state, action) {
      sessionStorage.setItem("token", action.payload.token);
      state.token = action.payload.accessToken;
      token = sessionStorage.setItem(
        "adminDetails",
        JSON.stringify(action.payload)
      );
      state.adminDetails = action.payload;
      console.log(action.payload);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
