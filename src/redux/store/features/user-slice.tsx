import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userApi } from "src/components/api";

interface userData {
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

export const createuser = createAsyncThunk(
  "user/createuser",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(`${userApi}/create-user`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateuser = createAsyncThunk(
  "user/updateuser",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.post(
        `${userApi}/update-user/${data.userID}`,
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

export const getMyuser = createAsyncThunk(
  "user/getMyuser",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAUser = createAsyncThunk(
  "user/ getAUser",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/single-user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getMyconsumer = createAsyncThunk(
  "user/getMyconsumer",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users?role=consumer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getMymerchant = createAsyncThunk(
  "user/getMymerchant",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users?role=merchant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const edituser = createAsyncThunk(
  "user/edituser",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${userApi}/${data.endpoint}/${data.userID}`,

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

export const deleteuser = createAsyncThunk(
  "user/deleteuser",
  async (id: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${userApi}/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
interface userState {
  users: any;
  merchants: any;
  consumers: any;
  user: any;
  success: boolean;
  loading: boolean;
  error: string;
  message: string;

  errorFetchusers: string;
  successFetchusers: boolean;
  loadingFetchusers: boolean;

  errorFetchmerchants: string;
  successFetchmerchants: boolean;
  loadingFetchmerchants: boolean;

  errorFetchuser: string;
  successFetchuser: boolean;
  loadingFetchuser: boolean;

  errorFetchconsumers: string;
  successFetchconsumers: boolean;
  loadingFetchconsumers: boolean;
}

const initialState: userState = {
  users: [],
  merchants: [],
  consumers: [],
  user: [],

  success: false,
  loading: false,
  error: "",
  message: "",

  errorFetchusers: "",
  successFetchusers: false,
  loadingFetchusers: false,

  errorFetchmerchants: "",
  successFetchmerchants: false,
  loadingFetchmerchants: false,

  errorFetchconsumers: "",
  successFetchconsumers: false,
  loadingFetchconsumers: false,
  errorFetchuser: "",
  successFetchuser: false,
  loadingFetchuser: false,
};

const userSlice = createSlice({
  name: "user",
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
    builder.addCase(createuser.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      createuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      createuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(getMyuser.pending, state => {
      state.loadingFetchusers = true;
    });
    builder.addCase(
      getMyuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchusers = false;
        state.successFetchusers = true;
        state.users = action.payload.data;
      }
    );
    builder.addCase(getMyuser.rejected, (state, action: PayloadAction<any>) => {
      state.loadingFetchusers = false;
      state.errorFetchusers = action.payload.message;
    });
    builder.addCase(getMyconsumer.pending, state => {
      state.loadingFetchconsumers = true;
    });
    builder.addCase(
      getMyconsumer.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchconsumers = false;
        state.successFetchconsumers = true;
        state.consumers = action.payload.data;
      }
    );
    builder.addCase(
      getMyconsumer.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchconsumers = false;
        state.errorFetchconsumers = action.payload.message;
      }
    );
    builder.addCase(getAUser.pending, state => {
      state.loadingFetchuser = true;
    });
    builder.addCase(getAUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loadingFetchuser = false;
      state.successFetchuser = true;
      state.user = action.payload.data;
    });
    builder.addCase(getAUser.rejected, (state, action: PayloadAction<any>) => {
      state.loadingFetchuser = false;
      state.errorFetchuser = action.payload.message;
    });
    builder.addCase(getMymerchant.pending, state => {
      state.loadingFetchmerchants = true;
    });
    builder.addCase(
      getMymerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchmerchants = false;
        state.successFetchmerchants = true;
        state.merchants = action.payload.data;
      }
    );
    builder.addCase(
      getMymerchant.rejected,
      (state, action: PayloadAction<any>) => {
        state.loadingFetchmerchants = false;
        state.errorFetchmerchants = action.payload.message;
      }
    );

    builder.addCase(updateuser.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      updateuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      updateuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(
      deleteuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      deleteuser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(edituser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(edituser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
export const { clearMessage, clearError } = userSlice.actions;

export default userSlice.reducer;
