import mongoose, { Document, Schema, Types } from "mongoose";
import { MessageStatus } from "../../domain/entities/message-entity";

export interface MessageDocument extends Document {
  text: string;
  senderId: Types.ObjectId;
  roomId: Types.ObjectId;
  status: MessageStatus;
  deletedAt: Date | null;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    text: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    roomId: { type: Schema.Types.ObjectId, required: true, ref: "Room" },
    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.SENT,
      required: true,
    },
    deletedAt: { type: Date, default: null },
    sentAt: { type: Date, default: Date.now },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<MessageDocument>(
  "Message",
  MessageSchema
);
