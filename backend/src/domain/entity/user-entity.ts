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
  readonly email: string;
  readonly passwordHash: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
}

export interface UserUpdate {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly isVerified?: boolean;
  readonly lastActiveAt?: Date | null;
  readonly isOnline?: boolean;
}
