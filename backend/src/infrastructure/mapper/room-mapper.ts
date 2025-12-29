import { Room } from "../../domain/entities/room-entity";
import { RoomDocument } from "../model/room-model";

export class RoomMapper {
  static toDomain(doc: RoomDocument): Room {
    return {
      id: doc._id.toString(),
      memberIds: doc.memberIds.map((id) => id.toString()),
      lastMessageId: doc.lastMessageId?.toString() || null,
      type: doc.type,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
