import { User } from "../../domain/entity/user-entity";
import { Token } from "../../util/jwt-util";

export interface SignupInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  bio?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthOutput {
  user: User;
  session: {
    accessToken: Token;
    refreshToken: Token;
  };
}
