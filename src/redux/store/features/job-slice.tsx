import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jobApi } from "src/components/api";

interface jobData {
  name: string;
  price: string;
  description: string;
  category_id: number;
  quantity: number;
  free_delivery: string;
  shipping_fee: number;
  discount_available: string;
  discount_percentage: number;
  brand: string;
  product_warranty: string;
  weight: number;
  productID: number;
}

export const createjob = createAsyncThunk(
  "job/createjob",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${jobApi}/create-job/${data.userID}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatejob = createAsyncThunk(
  "job/updatejob",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${jobApi}/update-job/${data.jobID}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editjob = createAsyncThunk(
  "job/editjob",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${jobApi}/${data.endpoint}/${data.jobID}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMyjobs = createAsyncThunk(
  "job/getMyjobs",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${jobApi}/all-jobs`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletejob = createAsyncThunk(
  "job/deletejob",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${jobApi}/delete-job/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
interface jobState {
  jobs: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchjobs: string;
  successFetchjobs: boolean;
  loadingFetchjobs: boolean;
}

const initialState: jobState = {
  jobs: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchjobs: "",
  successFetchjobs: false,
  loadingFetchjobs: false,
};

const jobSlice = createSlice({
  name: "job",
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
    builder.addCase(createjob.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createjob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(createjob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getMyjobs.pending, state => {
      state.loadingFetchjobs = true;
    });
    builder.addCase(
      getMyjobs.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchjobs = false;
        state.successFetchjobs = true;
        state.jobs = action.payload.data;
      }
    );
    builder.addCase(getMyjobs.rejected, (state, action: PayloadAction<any>) => {
      state.loadingFetchjobs = false;
      state.errorFetchjobs = action.payload.message;
    });
    builder.addCase(updatejob.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updatejob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(updatejob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(
      deletejob.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(deletejob.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
export const { clearMessage, clearError } = jobSlice.actions;

export default jobSlice.reducer;
