import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  isDeleted: boolean;
  deletedAt: Date | null;
  lastActiveAt: Date | null;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
    },
    bio: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    lastActiveAt: {
      type: Date,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster email lookups
// UserSchema.index({ email: 1 });

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  UserSchema,
);
