import { MessageStatus } from "../../domain/entities/message-entity";
import { User } from "../../domain/entities/user-entity";

export interface SendMessageInput {
  text: string;
  roomId: string;
  senderId: string;
}

export interface MessageStatusUpdateInput {
  status: MessageStatus;
}

export interface MessageUpdateInput {
  text?: string;
}

export interface MessageOutput {
  id: string;
  sender: User;
  text: string;
  status: MessageStatus;
  deletedAt: Date | null;
  readAt: Date | null;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
