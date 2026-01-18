import { inject, injectable } from "inversify";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { MessageStatus } from "../../../domain/entity/message-entity";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class GetMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository)
    private readonly messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(userid: string, messageId: string): Promise<MessageOutput> {
    const user = await this.userRepo.findById(userid);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found!");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or deleted!");
    }

    if (message.senderId !== userid) {
      throw new ForbiddenError("Only sender can get their message!");
    }

    return {
      id: message.id,
      text: message.text,
      sender: user,
      status: message.status,
      isEdited: message.isEdited,
      deletedAt: message.deletedAt,
      deliveredAt: message.deliveredAt,
      readAt: message.readAt,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }
}
