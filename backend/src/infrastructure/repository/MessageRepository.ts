import { injectable } from "inversify";
import {
  Message,
  MessageCreate,
  MessageUpdate,
} from "../../domain/entity/message-entity";
import { IMessageRepository } from "../../domain/repository/IMessageRepository";
import { MessageMapper } from "../mapper/message-mapper";
import { MessageModel } from "../model/message-model";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class MessageRepository implements IMessageRepository {
  async create(data: MessageCreate): Promise<Message> {
    const doc = await MessageModel.create({
      senderId: data.senderId,
      roomId: data.roomId,
      text: data.text,
    });
    return MessageMapper.toDomain(doc);
  }

  async update(messageId: string, updates: MessageUpdate): Promise<Message> {
    const doc = await MessageModel.findByIdAndUpdate(
      messageId,
      { $set: updates },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundError(`Message with id ${messageId} not found`);
    }
    return MessageMapper.toDomain(doc);
  }

  async delete(messageId: string): Promise<void> {
    const doc = await MessageModel.findByIdAndUpdate(messageId, {
      $set: { status: "deleted", deletedAt: new Date() },
    });
    if (!doc) {
      throw new NotFoundError(`Message with id ${messageId} not found`);
    }
  }

  async findById(messageId: string): Promise<Message | null> {
    const doc = await MessageModel.findById(messageId);
    return doc ? MessageMapper.toDomain(doc) : null;
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    const docs = await MessageModel.find({ roomId }).sort({ createdAt: 1 });
    return MessageMapper.toDomainList(docs);
  }
}
