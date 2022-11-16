import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DataState {
  users: (string | number | boolean | {})[];
  productCategory: (string | number | boolean | {})[];
  products: (string | number | boolean | {})[];
  merchants: (string | number | boolean | {})[];
  services: (string | number | boolean | {})[];
  jobs: (string | number | boolean | {})[];
}
// Define the initial state using that type
const initialState: DataState = {
  users: [],
  productCategory: [],
  products: [],
  merchants: [],
  services: [],
  jobs: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUsers(state, action) {
      state.users = [...action.payload];
    },
    addProductCategory(state, action) {
      state.productCategory = [...action.payload];
    },

    addProducts(state, action) {
      state.products = [...action.payload];
    },
    addMerchants(state, action) {
      state.merchants = [...action.payload];
    },
    addServices(state, action) {
      state.services = [...action.payload];
    },
    addJobs(state, action) {
      state.jobs = [...action.payload];
    },
  },
});
export const {
  addUsers,
  addProductCategory,
  addProducts,
  addMerchants,
  addServices,
  addJobs,
} = dataSlice.actions;

export default dataSlice;
