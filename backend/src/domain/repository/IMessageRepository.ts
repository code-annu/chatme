import {
  MessageCreate,
  Message,
  MessageUpdate,
} from "../entities/message-entity";

export interface IMessageRepository {
  create(message: MessageCreate): Promise<Message>;
  update(id: string, updates: MessageUpdate): Promise<Message | null>;
  delete(id: string): Promise<Message | null>;
  findById(id: string): Promise<Message | null>;
  findManyByRoomId(roomId: string): Promise<Message[]>;
  findLastMessageByRoomId(roomId: string): Promise<Message | null>;
}
