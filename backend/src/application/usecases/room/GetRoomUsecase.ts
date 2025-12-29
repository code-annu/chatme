import { inject, injectable } from "inversify";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { TYPES } from "../../../di/types";
import { RoomOutput } from "../../dto/room-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";

@injectable()
export class GetRoomUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository
  ) {}

  async execute(userId: string, roomId: string): Promise<RoomOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const room = await this.roomRepo.findById(roomId);
    if (!room) {
      throw new NotFoundError("Room not found");
    }
    if (!room.memberIds.includes(userId)) {
      throw new ForbiddenError("User is not a member of this room");
    }

    let lastMessage = null;
    let lastMessageSender = null;
    if (room.lastMessageId) {
      lastMessage = await this.messageRepo.findById(room.lastMessageId);
      if (lastMessage) {
        lastMessageSender = await this.userRepo.findById(lastMessage.senderId);
      }
    }

    const members = await this.userRepo.findManyByIds(room.memberIds);
    return {
      id: room.id,
      type: room.type,
      members: members,
      lastMessage: lastMessage,
      lastMessageSender: lastMessageSender,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
