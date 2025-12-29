import { RoomCreate, Room, RoomUpdate } from "../entities/room-entity";

export interface IRoomRepository {
  create(room: RoomCreate): Promise<Room>;
  update(id: string, updates: RoomUpdate): Promise<Room | null>;
  delete(id: string): Promise<Room | null>;
  findById(id: string): Promise<Room | null>;
  findCommonRoom(memberIds: string[]): Promise<Room | null>;
  findManyByUserId(userId: string): Promise<Room[]>;
}
