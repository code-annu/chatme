export enum RoomType {
  PRIVATE = "private",
  GROUP = "group",
}

export interface Room {
  id: string;
  memberIds: string[];
  lastMessageId: string | null;
  type: RoomType;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomCreate {
  memberIds: string[];
  type: RoomType;
}

export interface RoomUpdate {
  lastMessageId?: string;
}
