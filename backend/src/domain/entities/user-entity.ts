export interface User {
    id: string;
    username: string;
    password: string;
    fullname: string;
    profilePictureUrl: string | null;
    bio: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreate {
    username: string;
    password: string;
    fullname: string;
    profilePictureUrl?: string;
    bio?: string;
}

export interface UserUpdate {
    username?: string;
    fullname?: string;
    profilePictureUrl?: string;
    bio?: string;
}