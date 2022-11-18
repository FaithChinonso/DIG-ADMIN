import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import dataSlice from "./data-slice";
import authSlice from "./auth-slice";
import userSlice from "./features/user-slice";
import productSlice from "./features/product-slice";
import withdrawalSlice from "./features/withdrawal-slice";
import serviceSlice from "./features/service-slice";
import proposalSlice from "./features/proposal-slice";
import jobSlice from "./features/job-slice";
import productCategorySlice from "./features/product-category-slice";
import serviceCategorySlice from "./features/service-category-slice";
import orderSlice from "./features/order-slice";
import logSlice from "./features/log-slice";
import transactionSlice from "./features/transaction-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice,
    product: productSlice,
    order: orderSlice,
    service: serviceSlice,
    proposal: proposalSlice,
    withdrawal: withdrawalSlice,
    job: jobSlice,
    log: logSlice,
    transaction: transactionSlice,
    productCategory: productCategorySlice,
    serviceCategory: serviceCategorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
