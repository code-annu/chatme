/*import { inject, injectable } from "inversify";
import { IRoomRepository } from "../../../domain/repository/IRoomRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { TYPES } from "../../../di/types";
import { RoomOutput } from "../../dto/room-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

@injectable()
export class DeleteRoomUsecase {
  constructor(
    @inject(TYPES.IRoomRepository) private roomRepo: IRoomRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(userId: string, id: string): Promise<RoomOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or account may be deleted");
    }
    const room = await this.roomRepo.findById(id);
    if (!room) {
      throw new NotFoundError("Room not found");
    }
    if (room.memberIds.includes(userId)) {
      throw new ForbiddenError("");
    }
    await this.roomRepo.delete(id);
    return room;
  }
}
*/