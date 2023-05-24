import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  adminType,
  consumerType,
  driverType,
  merchantType,
  riderType,
} from "src/@types/data";
import { baseUrl, userApi } from "src/components/api";

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

export const getStates = createAsyncThunk(
  "user/getStates",
  async (thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://easy.unikmarketing.org/api/states/160`,
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
export const getMerchantCategory = createAsyncThunk(
  "user/getMerchantCategory",
  async (thunkAPI: any) => {
    try {
      const response = await axios.get(
        `https://easy.unikmarketing.org/api/flip/merchant/merchant-categories`
      );
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
        `${userApi}/update-user/${data.id}`,
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

export const getMyuser = createAsyncThunk(
  "user/getMyuser",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMyuser = createAsyncThunk(
  "user/fetchMyuser",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/all-users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMymerchant = createAsyncThunk(
  "user/getMymerchant",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/merchant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMymerchant = createAsyncThunk(
  "user/fetchMymerchant",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/merchant`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMyConsumers = createAsyncThunk(
  "user/getMyConsumers",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/consumer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMyConsumers = createAsyncThunk(
  "user/fetchMyConsumers",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/consumer`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMyRiders = createAsyncThunk(
  "user/getMyRiders",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/rider`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMyRiders = createAsyncThunk(
  "user/fetchMyRiders",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/rider`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMyDrivers = createAsyncThunk(
  "user/getMyDrivers",
  async (accessToken: any, thunkAPI: any) => {
    try {
      const response = await axios.get(`${userApi}/users-by-role/driver`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchMyDriver = createAsyncThunk(
  "user/fetchMyDriver",
  async (thunkAPI: any) => {
    try {
      let accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(`${userApi}/users-by-role/driver`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteuser = createAsyncThunk(
  "user/deleteuser",
  async (data: any, thunkAPI: any) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${userApi}/delete-user/${data.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface userState {
  users:
    | merchantType[]
    | driverType[]
    | consumerType[]
    | riderType[]
    | adminType[];
  merchants: merchantType[];
  states: any[];
  merchantCategory: any[];
  drivers: driverType[];
  consumers: consumerType[];
  riders: riderType[];
  success: boolean;
  loading: boolean;
  error: string;
  message: string;
}

const initialState: userState = {
  users: [],
  states: [],
  merchantCategory: [],
  merchants: [],
  drivers: [],
  consumers: [],
  riders: [],

  success: false,
  loading: false,
  error: "",
  message: "",
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
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );

    builder.addCase(getMyuser.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyuser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.users = action.payload.data;
      }
    );
    builder.addCase(getMyuser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action?.payload?.response) {
        state.error = action?.payload?.response?.data?.message;
      } else if (action?.payload?.request) {
        state.error = action?.payload?.message;
      } else {
        state.error = "An Error occured please try again";
      }
    });

    builder.addCase(getMymerchant.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getStates.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.states = action.payload.data;
      }
    );
    builder.addCase(
      getMerchantCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.merchantCategory = action.payload.data;
      }
    );
    builder.addCase(
      getMymerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.merchants = action.payload.data;
      }
    );
    builder.addCase(
      fetchMymerchant.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.merchants = action.payload.data;
      }
    );
    builder.addCase(
      getMymerchant.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );

    builder.addCase(getMyDrivers.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyDrivers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.drivers = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyDriver.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.drivers = action.payload.data;
      }
    );
    builder.addCase(
      getMyDrivers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );

    builder.addCase(getMyConsumers.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyConsumers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.consumers = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyConsumers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.consumers = action.payload.data;
      }
    );
    builder.addCase(
      getMyConsumers.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );

    builder.addCase(getMyRiders.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getMyRiders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.riders = action.payload.data;
      }
    );
    builder.addCase(
      fetchMyRiders.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.riders = action.payload.data;
      }
    );
    builder.addCase(
      getMyRiders.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
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
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
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
        if (action.payload.response) {
          state.error = action.payload.response.data.message;
        } else if (action.payload.request) {
          state.error = action.payload.response.data.message;
        } else {
          state.error = "An Error occured please try again";
        }
      }
    );
    builder.addCase(edituser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(edituser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload.response) {
        state.error = action.payload.response.data.message;
      } else if (action.payload.request) {
        state.error = action.payload.response.data.message;
      } else {
        state.error = "An Error occured please try again";
      }
    });
  },
});
export const { clearMessage, clearError } = userSlice.actions;

export default userSlice.reducer;
