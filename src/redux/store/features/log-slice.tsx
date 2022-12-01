import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { logApi } from "src/components/api";

export const getAdminlogs = createAsyncThunk(
  "log/getAdminlogs",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${logApi}/logs-by-admin/1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface logState {
  adminLogs: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: logState = {
  adminLogs: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    clearMessage: state => {
      state.message = "";
      state.success = false;
    },
    clearError: state => {
      state.error = "";
      state.success = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(getAdminlogs.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getAdminlogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminLogs = action.payload.data;
      }
    );
    builder.addCase(
      getAdminlogs.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = logSlice.actions;

export default logSlice.reducer;
