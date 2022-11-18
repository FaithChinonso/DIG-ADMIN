import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceApi } from "src/components/api";

interface serviceData {
  name: string;
  price: string;
  description: string;
  _id: number;
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

export const createservice = createAsyncThunk(
  "service/createservice",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(`${serviceApi}/create-service`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateservice = createAsyncThunk(
  "service/updateservice",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${serviceApi}/update-service/${data.serviceID}`,
        data,
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

export const getMyservice = createAsyncThunk(
  "service/getMyservice",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${serviceApi}/all-services`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editservice = createAsyncThunk(
  "service/editservice",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${serviceApi}/${data.endpoint}/${data.serviceID}`,

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

export const deleteservice = createAsyncThunk(
  "service/deleteservice",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${serviceApi}/delete-service/${id}`,
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
interface serviceState {
  services: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchservices: string;
  successFetchservices: boolean;
  loadingFetchservices: boolean;
}

const initialState: serviceState = {
  services: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchservices: "",
  successFetchservices: false,
  loadingFetchservices: false,
};

const serviceSlice = createSlice({
  name: "service",
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
    builder.addCase(createservice.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createservice.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createservice.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMyservice.pending, state => {
      state.loadingFetchservices = true;
    });
    builder.addCase(
      getMyservice.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchservices = false;
        state.successFetchservices = true;
        state.services = action.payload.data;
      }
    );
    builder.addCase(
      getMyservice.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchservices = false;
        state.errorFetchservices = action.payload.message;
      }
    );
    builder.addCase(updateservice.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateservice.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateservice.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      deleteservice.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteservice.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      editservice.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editservice.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = serviceSlice.actions;

export default serviceSlice.reducer;
