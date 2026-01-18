import { createSlice } from "@reduxjs/toolkit";
import type { ChatmeError } from "../../../util/error-handler-util";
import type { Token } from "../data/types";
import { loginUser, signupUser, tokenRefresh } from "./auth-thunk";

export interface AuthState {
  session: { accessToken: Token; refreshToken: Token } | null;

  signup: { loading: boolean; error: ChatmeError | null };

  login: { loading: boolean; error: ChatmeError | null };

  refreshToken: { loading: boolean; error: ChatmeError | null };
}

export const initialAuthState: AuthState = {
  session: null,
  signup: { loading: false, error: null },
  login: { loading: false, error: null },
  refreshToken: { loading: false, error: null },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.signup.loading = true;
        state.signup.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signup.loading = false;
        state.signup.error = null;
        state.session = action.payload.session;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signup.loading = false;
        state.signup.error = action.payload as ChatmeError;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.error = null;
        state.session = action.payload.session;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload as ChatmeError;
      });

    // Refresh Token
    builder
      .addCase(tokenRefresh.pending, (state) => {
        state.refreshToken.loading = true;
        state.refreshToken.error = null;
      })
      .addCase(tokenRefresh.fulfilled, (state, action) => {
        state.refreshToken.loading = false;
        state.refreshToken.error = null;
        state.session = action.payload.session;
      })
      .addCase(tokenRefresh.rejected, (state, action) => {
        state.refreshToken.loading = false;
        state.refreshToken.error = action.payload as ChatmeError;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
