import { inject, injectable } from "inversify";
import { SendMessageToRoomInput, MessageOutput } from "../../dto/message-dto";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { TYPES } from "../../../config/types";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class SendMessageToRoomUsecase {
  constructor(
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(input: SendMessageToRoomInput): Promise<MessageOutput> {
    const { roomId, senderId, text } = input;

    const sender = await this.userRepo.findById(senderId);
    if (!sender || sender.isDeleted) {
      throw new NotFoundError("Sender not found");
    }

    const room = await this.roomRepo.findById(roomId);
    if (!room) {
      throw new NotFoundError("Room not found");
    }
    if (!room.memberIds.includes(senderId)) {
      throw new ForbiddenError("Sender is not a member of the room");
    }

    const message = await this.messageRepo.create({
      text,
      senderId,
      roomId,
    });

    await this.roomRepo.update(roomId, { lastMessageId: message.id });

    return {
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
    };
  }
}
