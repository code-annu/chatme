import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../data/AuthApi";
import type { LoginRequest, SignupRequest } from "../data/types";
import {
  mapToCustomError,
  type ChatmeError,
} from "../../../util/error-handler-util";
import type { AuthUser } from "../data/types";

export const signupUser = createAsyncThunk<
  AuthUser,
  SignupRequest,
  { rejectValue: ChatmeError }
>("auth/signup", async (credentials: SignupRequest, { rejectWithValue }) => {
  try {
    const response = await AuthApi.signup(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthUser,
  LoginRequest,
  { rejectValue: ChatmeError }
>("auth/login", async (credentials: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await AuthApi.login(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});

export const tokenRefresh = createAsyncThunk<
  AuthUser,
  string,
  { rejectValue: ChatmeError }
>("auth/refreshToken", async (token: string, { rejectWithValue }) => {
  try {
    const response = await AuthApi.refreshToken(token);
    return response;
  } catch (error) {
    return rejectWithValue(mapToCustomError(error));
  }
});
