import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UpdateMessageStatusInput } from "../../dto/message-dto";
import { MessageStatus } from "../../../domain/entity/message-entity";
import { MessageUtil } from "../../../util/message-util";

@injectable()
export class UpdateMessageStatusUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
  ) {}

  async execute(input: UpdateMessageStatusInput): Promise<void> {
    const { userId, messageId, status } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found!");
    }

    const message = await this.messageRepo.findById(messageId);
    if (!message || message.status === MessageStatus.DELETED) {
      throw new NotFoundError("Message not found or deleted!");
    }

    const room = await this.roomRepo.findById(message.roomId);
    if (!room) {
      throw new NotFoundError("Room not found!");
    }

    if (!room.memberIds.includes(userId)) {
      throw new ForbiddenError(
        "You are not authorized to update the status of this message!",
      );
    }

    if (message.senderId !== userId) {
      throw new ForbiddenError("Sender can't update the status of messages!");
    }

    const sender = await this.userRepo.findById(message.senderId);
    if (!sender) {
      throw new NotFoundError("Sender not found!");
    }

    MessageUtil.validateMessageStatus(message.status, status);

    const updatedMessage = await this.messageRepo.update(messageId, {
      status: status,
      readAt: status === MessageStatus.READ ? new Date() : undefined,
      deliveredAt: status === MessageStatus.DELIVERED ? new Date() : undefined,
    });
    if (!updatedMessage) {
      throw new NotFoundError("Message not found!");
    }
  }
}
