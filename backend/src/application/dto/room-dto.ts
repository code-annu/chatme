import { Message } from "../../domain/entities/message-entity";
import { RoomType } from "../../domain/entities/room-entity";
import { User } from "../../domain/entities/user-entity";

export interface RoomCreateInput {
  memberIds: string[];
  type: RoomType;
}

export interface RoomOutput {
  id: string;
  type: RoomType;
  members: User[];
  lastMessage: null | Message;
  lastMessageSender: User | null;
  createdAt: Date;
  updatedAt: Date;
}
