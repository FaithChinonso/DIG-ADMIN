import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceCategoryApi } from "src/components/api";

interface serviceCategoryData {
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

export const createserviceCategory = createAsyncThunk(
  "service-category/createserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${serviceCategoryApi}/create-service-category`,
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

export const updateserviceCategory = createAsyncThunk(
  "service-category/updateserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${serviceCategoryApi}/update-service-category/${data.id}`,
        data.payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMyserviceCategories = createAsyncThunk(
  "service-category/getMyserviceCategories",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(
        `${serviceCategoryApi}/all-service-categories`,
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
export const editserviceCategory = createAsyncThunk(
  "service-category/editserviceCategory",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${serviceCategoryApi}/${data.endpoint}/${data.serviceCategoryID}`,

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

export const deleteserviceCategory = createAsyncThunk(
  "service-category/deleteserviceCategory",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${serviceCategoryApi}/delete-service-category/${id}`,
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
interface serviceCategoryState {
  serviceCategories: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchserviceCategorys: string;
  successFetchserviceCategorys: boolean;
  loadingFetchserviceCategorys: boolean;

  errorUpdateserviceCategorys: string;
  messageUpdateserviceCategorys: string;
  successUpdateserviceCategorys: boolean;
  loadingUpdateserviceCategorys: boolean;
}

const initialState: serviceCategoryState = {
  serviceCategories: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchserviceCategorys: "",
  successFetchserviceCategorys: false,
  loadingFetchserviceCategorys: false,

  errorUpdateserviceCategorys: "",
  messageUpdateserviceCategorys: "",
  successUpdateserviceCategorys: false,
  loadingUpdateserviceCategorys: false,
};

const serviceCategorySlice = createSlice({
  name: "serviceCategory",
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
    builder.addCase(createserviceCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMyserviceCategories.pending, state => {
      state.loadingFetchserviceCategorys = true;
    });
    builder.addCase(
      getMyserviceCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchserviceCategorys = false;
        state.successFetchserviceCategorys = true;
        state.serviceCategories = action.payload.data;
      }
    );
    builder.addCase(
      getMyserviceCategories.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchserviceCategorys = false;
        state.errorFetchserviceCategorys = action?.payload?.message;
      }
    );
    builder.addCase(updateserviceCategory.pending, state => {
      state.loadingUpdateserviceCategorys = true;
    });
    builder.addCase(
      updateserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingUpdateserviceCategorys = false;
        state.successUpdateserviceCategorys = true;
        state.messageUpdateserviceCategorys = action.payload.message;
      }
    );
    builder.addCase(
      updateserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingUpdateserviceCategorys = false;
        state.errorUpdateserviceCategorys = action.payload.message;
      }
    );
    builder.addCase(
      deleteserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      editserviceCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editserviceCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = serviceCategorySlice.actions;

export default serviceCategorySlice.reducer;
