import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { proposalApi } from "src/components/api";

interface proposalData {
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

export const createproposal = createAsyncThunk(
  "proposal/createproposal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${proposalApi}/create-proposal`,
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

export const updateproposal = createAsyncThunk(
  "product/updateproposal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${proposalApi}/update-proposal/${data.proposalID}`,
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

export const getMyproposal = createAsyncThunk(
  "order/getMyproposal",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${proposalApi}/all-proposals`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editproposal = createAsyncThunk(
  "product/editproposal",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${proposalApi}/${data.endpoint}/${data.proposalID}`,

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

export const deleteproposal = createAsyncThunk(
  "product/deleteproposal",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${proposalApi}/delete-proposal/${id}`,
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
interface proposalState {
  proposals: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchproposals: string;
  successFetchproposals: boolean;
  loadingFetchproposals: boolean;
}

const initialState: proposalState = {
  proposals: [],
  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchproposals: "",
  successFetchproposals: false,
  loadingFetchproposals: false,
};

const proposalSlice = createSlice({
  name: "proposal",
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
    builder.addCase(createproposal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMyproposal.pending, state => {
      state.loadingFetchproposals = true;
    });
    builder.addCase(
      getMyproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchproposals = false;
        state.successFetchproposals = true;
        state.proposals = action.payload.data;
      }
    );
    builder.addCase(
      getMyproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchproposals = false;
        state.errorFetchproposals = action.payload.message;
      }
    );
    builder.addCase(updateproposal.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      deleteproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      editproposal.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      editproposal.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});
export const { clearMessage, clearError } = proposalSlice.actions;

export default proposalSlice.reducer;
