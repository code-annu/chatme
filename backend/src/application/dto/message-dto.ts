import { MessageStatus } from "../../domain/entity/message-entity";
import { User } from "../../domain/entity/user-entity";

export interface SendMessageToRoomInput {
  roomId: string;
  senderId: string;
  text: string;
}

export interface SendMessageToUserInput {
  senderId: string;
  receiverId: string;
  text: string;
}

export interface EditMessageInput {
  userId: string;
  messageId: string;
  text: string;
}

export interface UpdateMessageStatusInput {
  userId: string;
  messageId: string;
  status: MessageStatus;
}

export interface MessageOutput {
  id: string;
  text: string;
  sender: User;
  status: MessageStatus;
  isEdited: boolean;
  deletedAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
