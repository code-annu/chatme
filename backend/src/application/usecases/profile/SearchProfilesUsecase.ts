import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";

@injectable()
export class SearchProfilesUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  async execute(query: string): Promise<ProfileOutput[]> {
    const users = await this.userRepository.searchByUsername(query);

    const notDeletedUsers = users.filter((user) => !user.isDeleted);

    return notDeletedUsers.map((user) => ({
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
