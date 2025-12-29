export enum MessageStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  DELETED = "deleted",
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  roomId: string;
  status: MessageStatus;
  deletedAt: Date | null;
  sentAt: Date;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageCreate {
  text: string;
  senderId: string;
  roomId: string;
}

export interface MessageUpdate {
  text?: string;
  status?: MessageStatus;
}
