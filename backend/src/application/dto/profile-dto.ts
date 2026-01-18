import { User } from "../../domain/entity/user-entity";

export interface ProfileUpdateInput {
  userId: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface ProfileOutput extends User {}
