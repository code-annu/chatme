export interface ProfileUpdateInput {
  username?: string;
  bio?: string;
  profilePictureUrl?: string;
  fullname?: string;
}

export interface ProfileOutput {
  id: string;
  username: string;
  fullname: string;
  profilePictureUrl: string | null;
  bio: string | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
