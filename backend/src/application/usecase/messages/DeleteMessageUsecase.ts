import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageStatus } from "../../../domain/entity/message-entity";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UnprocessableError } from "../../../domain/error/UnprocessableError";

@injectable()
export class DeleteMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
  ) {}

  async execute(userId: string, messageId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or deleted!");
    }

    if (message.senderId !== userId) {
      throw new ForbiddenError(
        "You are not authorized to delete this message!",
      );
    }

    if (message.status === MessageStatus.PENDING) {
      throw new UnprocessableError("Message can't be deleted before sent!");
    }

    await this.messageRepo.delete(messageId);
  }
}
