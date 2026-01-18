import { RoomCreate, Room, RoomUpdate } from "../entity/room-entity";

export interface IRoomRepository {
  create(room: RoomCreate): Promise<Room>;
  update(roomId: string, updates: RoomUpdate): Promise<Room>;
  delete(roomId: string): Promise<void>;
  findById(roomId: string): Promise<Room | null>;
  findByUserId(userId: string): Promise<Room[]>;
  findCommonByUserIds(userIds: string[]): Promise<Room | null>;
}
