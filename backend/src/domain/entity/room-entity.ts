export enum RoomType {
  PRIVATE = "private",
  GROUP = "group",
}

export interface Room {
  id: string;
  type: RoomType; // for now only private
  memberIds: string[]; // user ids
  lastMessageId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomCreate {
  type: RoomType;
  memberIds: string[];
}

export interface RoomUpdate {
  lastMessageId?: string;
}
