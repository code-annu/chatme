import { Message } from "../../domain/entities/message-entity";
import { MessageDocument } from "../model/message-model";

export class MessageMapper {
  static toDomain(doc: MessageDocument): Message {
    return {
      id: doc._id.toString(),
      text: doc.text,
      senderId: doc.senderId.toString(),
      roomId: doc.roomId.toString(),
      status: doc.status,
      deletedAt: doc.deletedAt,
      sentAt: doc.sentAt,
      readAt: doc.readAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
