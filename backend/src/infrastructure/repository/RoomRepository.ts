import { injectable } from "inversify";
import { Room, RoomCreate, RoomUpdate } from "../../domain/entity/room-entity";
import { IRoomRepository } from "../../domain/repository/IRoomRepository";
import { RoomMapper } from "../mapper/room-mapper";
import { RoomModel } from "../model/room-model";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class RoomRepository implements IRoomRepository {
  async create(data: RoomCreate): Promise<Room> {
    const doc = await RoomModel.create({
      type: data.type,
      memberIds: data.memberIds,
    });
    return RoomMapper.toDomain(doc);
  }

  async update(roomId: string, updates: RoomUpdate): Promise<Room> {
    const doc = await RoomModel.findByIdAndUpdate(
      roomId,
      { $set: updates },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundError(`Room with id ${roomId} not found`);
    }
    return RoomMapper.toDomain(doc);
  }

  async delete(roomId: string): Promise<void> {
    const doc = await RoomModel.findByIdAndDelete(roomId);
    if (!doc) {
      throw new NotFoundError(`Room with id ${roomId} not found`);
    }
  }

  async findById(roomId: string): Promise<Room | null> {
    const doc = await RoomModel.findById(roomId);
    return doc ? RoomMapper.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<Room[]> {
    const docs = await RoomModel.find({ memberIds: userId });
    return RoomMapper.toDomainList(docs);
  }

  async findCommonByUserIds(userIds: string[]): Promise<Room | null> {
    const doc = await RoomModel.findOne({
      memberIds: { $all: userIds, $size: userIds.length },
      type: "private",
    });
    return doc ? RoomMapper.toDomain(doc) : null;
  }
}
