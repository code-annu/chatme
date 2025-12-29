import { inject, injectable } from "inversify";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageStatus } from "../../../domain/entities/message-entity";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { MessageOutput } from "../../dto/message-dto";
import { DatabaseError } from "../../../domain/error/DatabaseError";

@injectable()
export class DeleteMessageUsecase {
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
      throw new ForbiddenError("You are not authorized to delete this message");
    }

    const deletedMessage = await this.messageRepo.delete(messageId);
    if (!deletedMessage) {
      throw new DatabaseError("Failed to delete message");
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
