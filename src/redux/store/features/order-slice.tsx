import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { orderApi } from "src/components/api";

interface orderData {
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

export const createOrder = createAsyncThunk(
  "order/createorder",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(`${orderApi}/create-order`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${orderApi}/update-order/${data.orderID}`,
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
export const editorder = createAsyncThunk(
  "order/editorder",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${orderApi}/${data.endpoint}/${data.orderID}`,

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

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${orderApi}/all-orders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getMyOrdersbyMerchant = createAsyncThunk(
  "order/getMyOrdersbyMerchant",
  async (orderID: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${orderApi}/orders-for-merchant/${orderID}`,
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
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${orderApi}/delete-order/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
interface orderState {
  orders: any;
  ordersByMerchant: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchOrders: string;
  successFetchOrders: boolean;
  loadingFetchOrders: boolean;
}

const initialState: orderState = {
  orders: [],
  ordersByMerchant: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchOrders: "",
  successFetchOrders: false,
  loadingFetchOrders: false,
};

const orderSlice = createSlice({
  name: "order",
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
    builder.addCase(createOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createOrder.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMyOrders.pending, state => {
      state.loadingFetchOrders = true;
    });
    builder.addCase(
      getMyOrders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchOrders = false;
        state.successFetchOrders = true;
        state.orders = action.payload.data;
      }
    );
    builder.addCase(
      getMyOrders.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchOrders = false;
        state.errorFetchOrders = action.payload.message;
      }
    );
    builder.addCase(getMyOrdersbyMerchant.pending, state => {
      state.loadingFetchOrders = true;
    });
    builder.addCase(
      getMyOrdersbyMerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchOrders = false;
        state.successFetchOrders = true;
        state.ordersByMerchant = action.payload.data;
      }
    );
    builder.addCase(
      getMyOrdersbyMerchant.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchOrders = false;
        state.errorFetchOrders = action.payload.message;
      }
    );
    builder.addCase(updateOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateOrder.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      deleteOrder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteOrder.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      editorder.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(editorder.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
export const { clearMessage, clearError } = orderSlice.actions;

export default orderSlice.reducer;
