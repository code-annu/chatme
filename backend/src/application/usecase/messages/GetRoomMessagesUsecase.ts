import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class GetRoomMessagesUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
  ) {}

  async execute(userId: string, roomId: string): Promise<MessageOutput[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const room = await this.roomRepo.findById(roomId);
    if (!room) {
      throw new NotFoundError("Room not found!");
    }
    if (!room.memberIds.includes(userId)) {
      throw new ForbiddenError("You are not authorized to access this room!");
    }

    const messages = await this.messageRepo.findByRoomId(roomId);
    const messagesOutput: MessageOutput[] = [];

    for (const message of messages) {
      const sender = await this.userRepo.findById(message.senderId);
      if (!sender) {
        throw new NotFoundError("Some members not found!");
      }
      messagesOutput.push({
        id: message.id,
        text: message.text,
        sender: sender,
        status: message.status,
        isEdited: message.isEdited,
        deletedAt: message.deletedAt,
        deliveredAt: message.deliveredAt,
        readAt: message.readAt,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      });
    }
    return messagesOutput;
  }
}
