import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { RoomOutput } from "../../dto/room-dto";

@injectable()
export class GetUserRoomsUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private readonly roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository,
    @inject(TYPES.IMessageRepository)
    private readonly messageRepo: IMessageRepository,
  ) {}

  async execute(userId: string): Promise<RoomOutput[]> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found!");
    }

    const rooms = await this.roomRepo.findByUserId(userId);

    const roomsOutput: RoomOutput[] = [];
    for (const room of rooms) {
      const { id, createdAt, updatedAt, type, memberIds, lastMessageId } = room;

      const members = await this.userRepo.findByIds(memberIds);
      const lastMessage = lastMessageId
        ? await this.messageRepo.findById(lastMessageId)
        : null;
      const lastMessageSender = lastMessage?.senderId
        ? await this.userRepo.findById(lastMessage.senderId)
        : null;

      const roomOutput: RoomOutput = {
        id,
        type,
        members,
        lastMessage,
        lastMessageSender,
        createdAt,
        updatedAt,
      };
      roomsOutput.push(roomOutput);
    }

    return roomsOutput;
  }
}
