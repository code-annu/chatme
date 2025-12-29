import { injectable } from "inversify";
import { IMessageRepository } from "../../domain/repository/IMessageRepository";
import {
  Message,
  MessageCreate,
  MessageStatus,
  MessageUpdate,
} from "../../domain/entities/message-entity";
import { MessageModel } from "../model/message-model";
import { MessageMapper } from "../mapper/message-mapper";
import { Types } from "mongoose";

@injectable()
export class MessageRepository implements IMessageRepository {
  async create(message: MessageCreate): Promise<Message> {
    const newMessage = await MessageModel.create({
      text: message.text,
      senderId: new Types.ObjectId(message.senderId),
      roomId: new Types.ObjectId(message.roomId),
    });
    return MessageMapper.toDomain(newMessage);
  }

  async update(id: string, updates: MessageUpdate): Promise<Message | null> {
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return updatedMessage ? MessageMapper.toDomain(updatedMessage) : null;
  }

  async delete(id: string): Promise<Message | null> {
    const deletedMessage = await MessageModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date(), status: MessageStatus.DELETED },
      { new: true }
    );
    return deletedMessage ? MessageMapper.toDomain(deletedMessage) : null;
  }

  async findById(id: string): Promise<Message | null> {
    const message = await MessageModel.findById(id);
    return message ? MessageMapper.toDomain(message) : null;
  }

  async findManyByRoomId(roomId: string): Promise<Message[]> {
    const messages = await MessageModel.find({ roomId });
    return messages.map(MessageMapper.toDomain);
  }

  async findLastMessageByRoomId(roomId: string): Promise<Message | null> {
    const message = await MessageModel.findOne({ roomId }).sort({
      createdAt: -1,
    });
    return message ? MessageMapper.toDomain(message) : null;
  }
}
