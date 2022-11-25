import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  token: string | null;
  adminDetails: {} | null;
  loading: boolean;
  error: string;
  success: boolean;
  message: string;
}
// Define the initial state using that type
const initialState: AuthState = {
  token:
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null,
  adminDetails:
    typeof window !== "undefined"
      ? sessionStorage.getItem("adminDetails")
      : null,
  loading: false,
  error: "",
  success: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler(state, action) {
      console.log(action.payload);
      sessionStorage.setItem("accessToken", action.payload.token);
      state.token = action.payload.token;
      sessionStorage.setItem(
        "adminDetails",
        JSON.stringify(action.payload.data)
      );
      state.adminDetails = action.payload.data;
      window.location.href = "/dashboard";
    },
    errorHandler(state, action) {
      state.error = action.payload.response.data.message;
      console.log(action.payload.response.data.message);
    },
    logoutHandler(state) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("adminDetails");
      state.token = "";
      state.adminDetails = {};
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
