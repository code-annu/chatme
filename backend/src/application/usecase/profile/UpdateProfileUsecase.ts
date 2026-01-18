import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileUpdateInput, ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: ProfileUpdateInput): Promise<ProfileOutput> {
    const { userId, firstName, lastName, bio, avatarUrl, isVerified } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or profile may be deleted");
    }

    const updatedUser = await this.userRepo.update(userId, {
      firstName,
      lastName,
      bio,
      avatarUrl,
      isVerified,
    });

    return updatedUser
  }
}
