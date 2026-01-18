import { Message, MessageStatus } from "../../domain/entity/message-entity";
import { IMessageDocument } from "../model/message-model";

export class MessageMapper {
  static toDomain(doc: IMessageDocument): Message {
    return {
      id: doc._id.toString(),
      senderId: doc.senderId.toString(),
      roomId: doc.roomId.toString(),
      text: doc.text,
      status: doc.status as MessageStatus,
      isEdited: doc.isEdited,
      deletedAt: doc.deletedAt,
      deliveredAt: doc.deliveredAt,
      readAt: doc.readAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: IMessageDocument[]): Message[] {
    return docs.map((doc) => MessageMapper.toDomain(doc));
  }
}
