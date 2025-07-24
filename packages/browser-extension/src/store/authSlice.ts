import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from "../api/api";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loggedIn: false,
  loading: false,
  error: null,
  isAdmin: false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isAdmin = action.payload.user.role === "manager";
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      state.loading = false;
      state.error = null;
      state.isAdmin = false; 
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.refreshToken.matchPending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      api.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loggedIn = true;
        state.isAdmin = action.payload.user.role === "manager";
        state.error = null;
      }
    );
    builder.addMatcher(
      api.endpoints.refreshToken.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = "Failed to refresh token";
      }
    );
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
