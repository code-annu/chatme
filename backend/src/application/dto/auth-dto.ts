import { Session } from "../../domain/entities/session-entity";
import { User } from "../../domain/entities/user-entity";

export interface SignupInput {
  username: string;
  password: string;
  fullname: string;
  profilePictureUrl?: string;
  bio?: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthOutput {
  user: User;
  accessToken: string;
  session: Session;
}
