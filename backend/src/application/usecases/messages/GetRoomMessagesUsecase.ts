import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types";
import { IMessageRepository } from "../../../domain/repository/IMessageRepository";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { MessageOutput } from "../../dto/message-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { DatabaseError } from "../../../domain/error/DatabaseError";

@injectable()
export class GetRoomMessagesUsecase {
  constructor(
    @inject(TYPES.IMessageRepository)
    private readonly messageRepo: IMessageRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
    @inject(TYPES.IRoomRepository)
    private readonly roomRepo: IRoomRepository
  ) {}

  async execute(userId: string, roomId: string): Promise<MessageOutput[]> {
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

    const messages = await this.messageRepo.findManyByRoomId(roomId);

    const messageOutputs = await Promise.all(
      messages.map(async (message) => {
        const messageSender = await this.userRepo.findById(message.senderId);
        if (!messageSender) {
          throw new DatabaseError("Something went wrong with database");
        }
        return {
          id: message.id,
          sender: messageSender,
          text: message.text,
          status: message.status,
          deletedAt: message.deletedAt,
          readAt: message.readAt,
          sentAt: message.sentAt,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };
      })
    );

    return messageOutputs;
  }
}
