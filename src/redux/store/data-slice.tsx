import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface DataState {
  // users: (string | number | boolean | {})[];
  productCategory: (string | number | boolean | {})[];

  merchants: (string | number | boolean | {})[];
  services: (string | number | boolean | {})[];
  jobs: (string | number | boolean | {})[];
  orders: (string | number | boolean | {})[];
  proposals: (string | number | boolean | {})[];
  withdrawals: (string | number | boolean | {})[];
  serviceCategory: (string | number | boolean | {})[];
}
// Define the initial state using that type
const initialState: DataState = {
  // users: [],
  productCategory: [],

  merchants: [],
  services: [],
  jobs: [],
  orders: [],
  proposals: [],
  withdrawals: [],
  serviceCategory: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // addUsers(state, action) {
    //   state.users = [...action.payload];
    // },
    addProductCategory(state, action) {
      state.productCategory = [...action.payload];
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
    addOrders(state, action) {
      state.orders = [...action.payload];
    },
    addProposal(state, action) {
      state.proposals = [...action.payload];
    },
    addServiceCategory(state, action) {
      state.serviceCategory = [...action.payload];
    },
    addWithdrawals(state, action) {
      state.withdrawals = [...action.payload];
    },
  },
});
export const {
  // addUsers,
  addProductCategory,

  addMerchants,
  addServices,
  addJobs,
  addOrders,
  addWithdrawals,
  addServiceCategory,
  addProposal,
} = dataSlice.actions;

export default dataSlice;
