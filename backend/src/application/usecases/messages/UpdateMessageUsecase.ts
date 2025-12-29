import { inject, injectable } from "inversify";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput, MessageUpdateInput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { DatabaseError } from "../../../domain/error/DatabaseError";

@injectable()
export class UpdateMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    messageId: string,
    updates: MessageUpdateInput
  ): Promise<MessageOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.deletedAt) {
      throw new NotFoundError("Message not found or may be deleted");
    }

    if (message.senderId !== userId) {
      throw new ForbiddenError("User not authorized to update this message");
    }

    const updatedMessage = await this.messageRepo.update(messageId, {
      text: updates.text,
    });
    if (!updatedMessage) {
      throw new DatabaseError("Failed to update message");
    }

    return {
      id: updatedMessage.id,
      sender: user,
      text: updatedMessage.text,
      status: updatedMessage.status,
      deletedAt: updatedMessage.deletedAt,
      readAt: updatedMessage.readAt,
      sentAt: updatedMessage.sentAt,
      createdAt: updatedMessage.createdAt,
      updatedAt: updatedMessage.updatedAt,
    };
  }
}
