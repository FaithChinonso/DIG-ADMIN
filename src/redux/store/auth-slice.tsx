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
      ? JSON.parse(sessionStorage.getItem("adminDetails"))
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
      state.message = action.payload.message;
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
      if (action.payload.response) {
        state.error = action.payload.response.data.message;
      } else if (action.payload.request) {
        state.error = "An Error occured on our end, please reload";
      } else {
        state.error = "An Error occured please try again";
      }
    },
    logoutHandler(state) {
      sessionStorage.removeItem("accessToken");
      // sessionStorage.removeItem("adminDetails");
      state.token = "";
      state.adminDetails = {};
      window.location.href = "/";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
