import { postRequest } from "../../../service/api/post-client";
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  SignupRequest,
} from "./types";

export abstract class AuthApi {
  public static async signup(credentials: SignupRequest): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/signup",
      credentials,
    );
    return response.data;
  }

  public static async login(credentials: LoginRequest): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  }

  public static async refreshToken(token: string): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>("/auth/refresh-token", {
      token,
    });
    return response.data;
  }
}
