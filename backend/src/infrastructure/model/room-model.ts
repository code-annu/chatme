import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRoomDocument extends Document {
  _id: mongoose.Types.ObjectId;
  type: "private" | "group";
  memberIds: mongoose.Types.ObjectId[];
  lastMessageId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoomDocument>(
  {
    type: {
      type: String,
      enum: ["private", "group"],
      required: true,
      default: "private",
    },
    memberIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
    lastMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster user room lookups
RoomSchema.index({ memberIds: 1 });

export const RoomModel: Model<IRoomDocument> = mongoose.model<IRoomDocument>(
  "Room",
  RoomSchema,
);
