import { Room, RoomType } from "../../domain/entity/room-entity";
import { IRoomDocument } from "../model/room-model";

export class RoomMapper {
  static toDomain(doc: IRoomDocument): Room {
    return {
      id: doc._id.toString(),
      type: doc.type as RoomType,
      memberIds: doc.memberIds.map((id) => id.toString()),
      lastMessageId: doc.lastMessageId?.toString() ?? null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: IRoomDocument[]): Room[] {
    return docs.map((doc) => RoomMapper.toDomain(doc));
  }
}
