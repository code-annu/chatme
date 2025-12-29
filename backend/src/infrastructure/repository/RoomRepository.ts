import { injectable } from "inversify";
import { IRoomRepository } from "../../domain/repository/IRoomRepository";
import {
  Room,
  RoomCreate,
  RoomUpdate,
  RoomType,
} from "../../domain/entities/room-entity";
import { RoomModel } from "../model/room-model";
import { RoomMapper } from "../mapper/room-mapper";
import { Types } from "mongoose";

@injectable()
export class RoomRepository implements IRoomRepository {
  async create(room: RoomCreate): Promise<Room> {
    const newRoom = await RoomModel.create({
      memberIds: room.memberIds.map((id) => new Types.ObjectId(id)),
      type: room.type,
    });
    return RoomMapper.toDomain(newRoom);
  }

  async update(id: string, updates: RoomUpdate): Promise<Room | null> {
    const updatedRoom = await RoomModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return updatedRoom ? RoomMapper.toDomain(updatedRoom) : null;
  }

  async delete(id: string): Promise<Room | null> {
    const deletedRoom = await RoomModel.findByIdAndDelete(id);
    return deletedRoom ? RoomMapper.toDomain(deletedRoom) : null;
  }

  async findById(id: string): Promise<Room | null> {
    const room = await RoomModel.findById(id);
    return room ? RoomMapper.toDomain(room) : null;
  }

  async findCommonRoom(memberIds: string[]): Promise<Room | null> {
    const room = await RoomModel.findOne({
      memberIds: {
        $all: memberIds.map((id) => new Types.ObjectId(id)),
        $size: memberIds.length,
      },
      type: RoomType.PRIVATE,
    });
    return room ? RoomMapper.toDomain(room) : null;
  }

  async findManyByUserId(userId: string): Promise<Room[]> {
    const rooms = await RoomModel.find({ memberIds: userId });
    return rooms.map(RoomMapper.toDomain);
  }
}
