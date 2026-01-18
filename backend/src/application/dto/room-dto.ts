import { Message } from "../../domain/entity/message-entity";
import { RoomType } from "../../domain/entity/room-entity";
import { User } from "../../domain/entity/user-entity";

export interface RoomOutput {
  id: string;
  type: RoomType;
  members: User[];
  lastMessage: Message | null;
  lastMessageSender: User | null;
  createdAt: Date;
  updatedAt: Date;
}
