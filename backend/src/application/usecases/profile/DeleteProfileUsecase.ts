import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<ProfileOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isDeleted) {
      throw new NotFoundError("User account has been deleted");
    }

    const deletedUser = await this.userRepository.delete(userId);

    if (!deletedUser) {
      // Should catch cases where it was deleted concurrently or checks fail
      throw new NotFoundError("User could not be deleted");
    }

    return {
      id: deletedUser.id,
      username: deletedUser.username,
      fullname: deletedUser.fullname,
      profilePictureUrl: deletedUser.profilePictureUrl,
      bio: deletedUser.bio,
      isDeleted: deletedUser.isDeleted,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt,
    };
  }
}
