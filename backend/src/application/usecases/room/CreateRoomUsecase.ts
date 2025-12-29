import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { RoomCreateInput, RoomOutput } from "../../dto/room-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { RoomType } from "../../../domain/entities/room-entity";
import { UnprocessableError } from "../../../domain/error/UnprocessableError";

@injectable()
export class CreateRoomUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private roomRepository: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userId: string, input: RoomCreateInput): Promise<RoomOutput> {
    if (!input.memberIds.includes(userId)) {
      input.memberIds.push(userId);
    }

    const members = await this.userRepository.findManyByIds(input.memberIds);
    const deleteMembers = members.filter((member) => member.isDeleted);
    if (members.length !== input.memberIds.length || deleteMembers.length > 0) {
      throw new NotFoundError(
        "Some users account not found or has been deleted"
      );
    }

    if (members.length < 2) {
      throw new UnprocessableError("At least two members are required");
    }
    if (members.length > 2 && input.type === RoomType.PRIVATE) {
      throw new UnprocessableError(
        "Only two members are allowed for private chat"
      );
    }

    let room = await this.roomRepository.findCommonRoom(input.memberIds);
    if (!room) {
      room = await this.roomRepository.create({
        type: input.type,
        memberIds: input.memberIds,
      });
    }

    return {
      id: room.id,
      type: room.type,
      members: members,
      lastMessage: null,
      lastMessageSender: null,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
