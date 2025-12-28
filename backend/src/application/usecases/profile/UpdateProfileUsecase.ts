import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput, ProfileUpdateInput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ConflictError } from "../../../domain/error/ConflictError";

@injectable()
export class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    input: ProfileUpdateInput
  ): Promise<ProfileOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isDeleted) {
      throw new NotFoundError("User account has been deleted");
    }

    if (input.username && input.username !== user.username) {
      const existingUser = await this.userRepository.findByUsername(
        input.username
      );
      if (existingUser) {
        throw new ConflictError("Username already exists");
      }
    }

    const updatedUser = await this.userRepository.update(userId, input);

    if (!updatedUser) {
      throw new NotFoundError("User not found during update");
    }

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      fullname: updatedUser.fullname,
      profilePictureUrl: updatedUser.profilePictureUrl || null,
      bio: updatedUser.bio || null,
      isDeleted: updatedUser.isDeleted,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
