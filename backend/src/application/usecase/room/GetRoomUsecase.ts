import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { RoomOutput } from "../../dto/room-dto";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class GetRoomUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private readonly roomRepo: IRoomRepository,
    @inject(TYPES.IMessageRepository)
    private readonly messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(userId: string, roomId: string): Promise<RoomOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found!");
    }

    const room = await this.roomRepo.findById(roomId);
    if (!room) {
      throw new NotFoundError("Room not found!");
    }
    if (!room.memberIds.includes(userId)) {
      throw new ForbiddenError("User is not a member of this room!");
    }

    const lastMessage = room.lastMessageId
      ? await this.messageRepo.findById(room.lastMessageId)
      : null;

    const lastMessageSender = lastMessage?.senderId
      ? await this.userRepo.findById(lastMessage.senderId)
      : null;

    const members = await this.userRepo.findByIds(room.memberIds);

    return {
      id: room.id,
      type: room.type,
      members,
      lastMessage,
      lastMessageSender,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
