import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { SendMessageInput, MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class SendMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(input: SendMessageInput): Promise<MessageOutput> {
    const sender = await this.userRepo.findById(input.senderId);
    if (!sender || sender.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const room = await this.roomRepo.findById(input.roomId);
    if (!room) throw new NotFoundError("Room not found");

    if (!room.memberIds.includes(input.senderId)) {
      throw new ForbiddenError("Sender is not a member of this room");
    }

    const message = await this.messageRepo.create({
      text: input.text,
      senderId: input.senderId,
      roomId: input.roomId,
    });

    await this.roomRepo.update(room.id, {
      lastMessageId: message.id,
    });

    return {
      id: message.id,
      sender: sender,
      text: message.text,
      status: message.status,
      deletedAt: message.deletedAt,
      readAt: message.readAt,
      sentAt: message.sentAt,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }
}
