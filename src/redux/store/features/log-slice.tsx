import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { logApi } from "src/components/api";

export const getMylogs = createAsyncThunk(
  "log/getMylogs",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${logApi}/all-logs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAdminlogs = createAsyncThunk(
  "log/getAdminlogs",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${logApi}/logs-by-admin/1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface logState {
  logs: any;
  adminLogs: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchlogs: string;
  successFetchlogs: boolean;
  loadingFetchlogs: boolean;
}

const initialState: logState = {
  logs: [],
  adminLogs: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchlogs: "",
  successFetchlogs: false,
  loadingFetchlogs: false,
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
    builder.addCase(getMylogs.pending, state => {
      state.loadingFetchlogs = true;
    });
    builder.addCase(
      getMylogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchlogs = false;
        state.successFetchlogs = true;
        state.logs = action.payload.data;
      }
    );
    builder.addCase(getMylogs.rejected, (state, action: PayloadAction<any>) => {
      state.loadingFetchlogs = false;
      state.errorFetchlogs = action.payload.message;
    });

    builder.addCase(getAdminlogs.pending, state => {
      state.loadingFetchlogs = true;
    });
    builder.addCase(
      getAdminlogs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchlogs = false;
        state.successFetchlogs = true;
        state.adminLogs = action.payload.data;
      }
    );
    builder.addCase(
      getAdminlogs.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchlogs = false;
        state.errorFetchlogs = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = logSlice.actions;

export default logSlice.reducer;
