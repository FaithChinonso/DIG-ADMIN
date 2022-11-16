import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import dataSlice from "./data-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
