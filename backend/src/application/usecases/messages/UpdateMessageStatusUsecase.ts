import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput, MessageStatusUpdateInput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { MessageStatus } from "../../../domain/entities/message-entity";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { UnprocessableError } from "../../../domain/error/UnprocessableError";
import { DatabaseError } from "../../../domain/error/DatabaseError";

@injectable()
export class UpdateMessageStatusUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository
  ) {}

  async execute(
    userId: string,
    messageId: string,
    updates: MessageStatusUpdateInput
  ): Promise<MessageOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or may be deleted");
    }

    const room = await this.roomRepo.findById(message.roomId);
    if (!room) {
      throw new NotFoundError("Room not found or may be deleted");
    }

    if (!room.memberIds.includes(userId)) {
      throw new ForbiddenError("User is not a member of this room");
    }

    if (updates.status === MessageStatus.DELETED) {
      throw new UnprocessableError("Cannot update message status to deleted");
    }

    const updatedMessage = await this.messageRepo.update(messageId, {
      status: updates.status,
    });
    if (!updatedMessage) {
      throw new DatabaseError("Failed to update message status");
    }

    const sender = await this.userRepo.findById(message.senderId);
    if (!sender) {
      throw new NotFoundError("Sender not found or account may be deleted");
    }

    return {
      id: updatedMessage.id,
      sender,
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
