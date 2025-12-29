import { inject, injectable } from "inversify";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { TYPES } from "../../../di/types";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { MessageStatus } from "../../../domain/entities/message-entity";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class GetMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository)
    private readonly messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository
  ) {}

  async execute(userId: string, messageId: string): Promise<MessageOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or may be deleted");
    }
    if (message.senderId !== userId) {
      throw new ForbiddenError("You are not authorized to access this message");
    }

    return {
      id: message.id,
      sender: user,
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
