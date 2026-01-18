export interface User {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly firstName: string;
  readonly lastName: string | null;
  readonly bio: string | null;
  readonly avatarUrl: string | null;
  readonly isVerified: boolean;
  readonly isDeleted: boolean;
  readonly deletedAt: Date | null;
  readonly lastActiveAt: Date | null;
  readonly isOnline: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserCreate {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  lastActiveAt?: Date | null;
  isOnline?: boolean;
}
