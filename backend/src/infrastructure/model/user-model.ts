import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    password?: string; // Optional because we might select without it
    fullname: string;
    profilePictureUrl?: string;
    bio?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        profilePictureUrl: { type: String, default: null },
        bio: { type: String, default: null },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Indexes
// UserSchema.index({ username: 1 });

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
