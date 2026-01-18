import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMessageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  text: string;
  status: "pending" | "sent" | "delivered" | "read" | "deleted";
  isEdited: boolean;
  deletedAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessageDocument>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "read", "deleted"],
      default: "sent",
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster room message lookups
MessageSchema.index({ roomId: 1, createdAt: -1 });

export const MessageModel: Model<IMessageDocument> =
  mongoose.model<IMessageDocument>("Message", MessageSchema);
