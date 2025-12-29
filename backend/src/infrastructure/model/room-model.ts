import mongoose, { Document, Schema, Types } from "mongoose";
import { RoomType } from "../../domain/entities/room-entity";

export interface RoomDocument extends Document {
  memberIds: Types.ObjectId[];
  lastMessageId?: Types.ObjectId;
  type: RoomType;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<RoomDocument>(
  {
    memberIds: [{ type: Types.ObjectId, required: true }],
    lastMessageId: { type: Types.ObjectId, default: null },
    type: { type: String, enum: Object.values(RoomType), required: true },
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model<RoomDocument>("Room", RoomSchema);
