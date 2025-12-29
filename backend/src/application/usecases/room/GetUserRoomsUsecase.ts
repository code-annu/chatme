import { inject, injectable } from "inversify";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { TYPES } from "../../../di/types";
import { RoomOutput } from "../../dto/room-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";

@injectable()
export class GetUserRoomsUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IMessageRepository) private messageRepo: IMessageRepository
  ) {}

  async execute(userId: string): Promise<RoomOutput[]> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }

    const rooms = await this.roomRepo.findManyByUserId(userId);
    const roomOutputs: RoomOutput[] = await Promise.all(
      rooms.map(async (room) => {
        const members = await this.userRepo.findManyByIds(room.memberIds);
        let lastMessage = null;
        let lastMessageSender = null;
        if (room.lastMessageId) {
          lastMessage = await this.messageRepo.findById(room.lastMessageId);
          if (lastMessage) {
            lastMessageSender = await this.userRepo.findById(
              lastMessage.senderId
            );
          }
        }
        return {
          id: room.id,
          type: room.type,
          members: members,
          lastMessage: lastMessage,
          lastMessageSender: lastMessageSender,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        };
      })
    );

    return roomOutputs;
  }
}
