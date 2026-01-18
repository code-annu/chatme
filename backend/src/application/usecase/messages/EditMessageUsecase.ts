import { injectable } from "inversify";
import { EditMessageInput, MessageOutput } from "../../dto/message-dto";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { TYPES } from "../../../config/types";
import { inject } from "inversify";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { MessageStatus } from "../../../domain/entity/message-entity";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { UnprocessableError } from "../../../domain/error/UnprocessableError";

@injectable()
export class EditMessageUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
  ) {}

  async execute(input: EditMessageInput): Promise<MessageOutput> {
    const { userId, messageId, text } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found!");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or deleted!");
    }

    if (message.senderId !== userId) {
      throw new ForbiddenError("You are not authorized to edit this message!");
    }

    if (
      message.status === MessageStatus.READ ||
      message.status === MessageStatus.PENDING
    ) {
      throw new UnprocessableError(
        "Before sent or after read message can't be edited!",
      );
    }

    const updatedMessage = await this.messageRepo.update(messageId, {
      text,
      isEdited: true,
    });

    return {
      id: updatedMessage.id,
      text: updatedMessage.text,
      sender: user,
      status: updatedMessage.status,
      isEdited: updatedMessage.isEdited,
      deletedAt: updatedMessage.deletedAt,
      deliveredAt: updatedMessage.deliveredAt,
      readAt: updatedMessage.readAt,
      createdAt: updatedMessage.createdAt,
      updatedAt: updatedMessage.updatedAt,
    };
  }
}
