import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISessionDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster lookups
SessionSchema.index({ userId: 1 });
SessionSchema.index({ token: 1 });
SessionSchema.index({ expiresAt: 1 });

export const SessionModel: Model<ISessionDocument> =
  mongoose.model<ISessionDocument>("Session", SessionSchema);
