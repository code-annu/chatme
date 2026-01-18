import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { SendMessageToUserInput, MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { text } from "express";
import { RoomType } from "../../../domain/entity/room-entity";

@injectable()
export class SendMessageToUserUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository,
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
  ) {}

  async execute(input: SendMessageToUserInput): Promise<MessageOutput> {
    const { senderId, receiverId, text } = input;

    const sender = await this.userRepo.findById(senderId);
    if (!sender || sender.isDeleted) {
      throw new NotFoundError("Sender not found");
    }

    const receiver = await this.userRepo.findById(receiverId);
    if (!receiver || receiver.isDeleted) {
      throw new NotFoundError("Receiver not found");
    }

    let room = await this.roomRepo.findCommonByUserIds([senderId, receiverId]);
    if (!room) {
      room = await this.roomRepo.create({
        type: RoomType.PRIVATE,
        memberIds: [senderId, receiverId],
      });
    }

    const message = await this.messageRepo.create({
      text,
      senderId,
      roomId: room.id,
    });

    await this.roomRepo.update(room.id, { lastMessageId: message.id });

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
