import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { withdrawalApi } from "src/components/api";

interface withdrawalData {
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

export const createwithdrawal = createAsyncThunk(
  "withdrawal/createwithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${withdrawalApi}/create-withdrawal`,
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

export const updatewithdrawal = createAsyncThunk(
  "withdrawal/updatewithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${withdrawalApi}/update-withdrawal/${data.withdrawalID}`,
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

export const getMywithdrawal = createAsyncThunk(
  "withdrawal/getMywithdrawal",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(`${withdrawalApi}/all-withdrawals`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editwithdrawal = createAsyncThunk(
  "withdrawal/editwithdrawal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${withdrawalApi}/${data.endpoint}/${data.withdrawalID}`,

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

export const deletewithdrawal = createAsyncThunk(
  "withdrawal/deletewithdrawal",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${withdrawalApi}/delete-withdrawal/${id}`,
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
interface withdrawalState {
  withdrawals: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchwithdrawals: string;
  successFetchwithdrawals: boolean;
  loadingFetchwithdrawals: boolean;
}

const initialState: withdrawalState = {
  withdrawals: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchwithdrawals: "",
  successFetchwithdrawals: false,
  loadingFetchwithdrawals: false,
};

const withdrawalSlice = createSlice({
  name: "withdrawal",
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
    builder.addCase(createwithdrawal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createwithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createwithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMywithdrawal.pending, state => {
      state.loadingFetchwithdrawals = true;
    });
    builder.addCase(
      getMywithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchwithdrawals = false;
        state.successFetchwithdrawals = true;
        state.withdrawals = action.payload.data;
      }
    );
    builder.addCase(
      getMywithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchwithdrawals = false;
        state.errorFetchwithdrawals = action.payload.message;
      }
    );
    builder.addCase(updatewithdrawal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updatewithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updatewithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      deletewithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deletewithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      editwithdrawal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editwithdrawal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = withdrawalSlice.actions;

export default withdrawalSlice.reducer;
