import {
  MessageCreate,
  Message,
  MessageUpdate,
} from "../entity/message-entity";

export interface IMessageRepository {
  create(message: MessageCreate): Promise<Message>;
  update(messageId: string, updates: MessageUpdate): Promise<Message>;
  delete(messageId: string): Promise<void>;
  findById(messageId: string): Promise<Message | null>;
  findByRoomId(roomId: string): Promise<Message[]>;
}
