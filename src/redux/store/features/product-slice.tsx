import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { productApi } from "src/components/api";

interface productData {
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

export const createproduct = createAsyncThunk(
  "product/createproduct",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${productApi}/create-product/${data.id}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateproduct = createAsyncThunk(
  "product/updateProduct",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${productApi}/update-product/${data.id}`,
        data.payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyproduct = createAsyncThunk(
  "order/getMyproduct",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${productApi}/all-products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editproduct = createAsyncThunk(
  "product/editproduct",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${productApi}/${data.endPoint}/${data.productID}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchProduct = createAsyncThunk(
  "order/fetchProduct",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${productApi}/all-products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteproduct = createAsyncThunk(
  "product/deleteproduct",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${productApi}/delete-product/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface productState {
  products: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: productState = {
  products: [],
  success: false,
  loading: false,
  error: "",
  message: "",
};

const productSlice = createSlice({
  name: "product",
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
    builder.addCase(createproduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createproduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createproduct.rejected,
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
    builder.addCase(getMyproduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyproduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = action.payload.data;
      }
    );
    builder.addCase(
      getMyproduct.rejected,
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
      fetchProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products = action.payload.data;
      }
    );
    builder.addCase(updateproduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateproduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateproduct.rejected,
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
      deleteproduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteproduct.rejected,
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
      editproduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editproduct.rejected,
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
export const { clearMessage, clearError } = productSlice.actions;

export default productSlice.reducer;