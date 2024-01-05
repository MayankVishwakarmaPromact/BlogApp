import { createSlice } from "@reduxjs/toolkit";

const admin = {
  id: 1,
  email: "admin@holaamigo.com",
  password: "password",
  isAdminLogin: false,
};

const adminReducer = createSlice({
  name: "admin",
  initialState: { admin },
  reducers: {
    login: (state, action) => { 
      if (
        state.admin.email == action.payload.email &&
        state.admin.password == action.payload.password
      ) {
        state.admin.isAdminLogin = true;
      }
    },
    isAdminLogin: (state) => {
      return state.admin.isAdminLogin;
    },
    logout: (state) => {
      state.admin.isAdminLogin = false;
    },
  },
});

export default adminReducer.reducer;
export const { login, isAdminLogin, logout } = adminReducer.actions;
