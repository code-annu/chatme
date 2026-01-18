export interface Token {
  token: string;
  expiresAt: Date;
}

export interface AuthUser {
  user: {
    id: string;
    firstName: string;
    email: string;
    avatarUrl: string | null;
    createdAt: Date;
  };
  session: {
    accessToken: Token;
    refreshToken: Token;
  };
}

export interface AuthResponse {
  status: string;
  code: number;
  message: string;
  data: AuthUser;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
