import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { tripType } from "src/@types/data";
import { tripApi } from "src/components/api";

export const getMyTrips = createAsyncThunk(
  "trip/getMyTrips",
  async (token: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/all-trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMyTrips = createAsyncThunk(
  "trip/fetchMyTrips",
  async (token: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${tripApi}/all-trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTrip = createAsyncThunk(
  "trip/deleteTrip",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${tripApi}/delete-trip/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface tripState {
  trips: tripType[];
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: tripState = {
  trips: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const tripSlice = createSlice({
  name: "trip",
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
    builder.addCase(getMyTrips.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyTrips.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.trips = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyTrips.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.trips = action.payload.data;
      }
    );
    builder.addCase(
      getMyTrips.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = "An Error occured on our end";
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );
    builder.addCase(
      deleteTrip.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteTrip.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = "An Error occured on our end";
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );
  },
});
export const { clearMessage, clearError } = tripSlice.actions;

export default tripSlice.reducer;
