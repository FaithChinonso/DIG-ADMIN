import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    page: "General Administration",
    section: "Dashboard",
    signinDetails: {},
    details: [],
    users: [],
    profilePicture: null,
    productCategory: [],
    token: "",
  },
  reducers: {
    addPage(state, action) {
      state.page = action.payload;
    },
    addSection(state, action) {
      state.section = action.payload;
    },
    saveSignin(state, action) {
      state.signinDetails = action.payload;
      console.log(signinDetails);
    },
    addUsers(state, action) {
      state.users = [...action.payload];
    },
    addProductCategory(state, action) {
      state.productCategory = [...action.payload];
    },
    saveProfilePicture(state, action) {
      state.profilePicture = action.payload;
    },
    saveDetails(state, action) {
      state.details.push(action.payload);
    },
    addToken(state, action) {
      state.token = action.payload;
    },
  },
});
export const {
  addPage,
  addSection,
  saveSignin,
  addUsers,
  addProductCategory,
  saveProfilePicture,
  saveDetails,
  addToken,
} = dataSlice.actions;

export default dataSlice;
