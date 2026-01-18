export enum MessageStatus {
  PENDING = "pending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  DELETED = "deleted",
}

export interface Message {
  id: string;
  senderId: string;
  roomId: string;
  text: string;
  status: MessageStatus;
  isEdited: boolean;
  deletedAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageCreate {
  senderId: string;
  roomId: string;
  text: string;
}

export interface MessageUpdate {
  text?: string;
  status?: MessageStatus;
  isEdited?: boolean;
  deliveredAt?: Date;
  readAt?: Date;
}
