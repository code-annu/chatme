import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ProfileOutput } from "../../dto/profile-dto";
import { NotFoundError } from "../../../domain/error/NotFoundError";

@injectable()
export class GetProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(userId: string): Promise<ProfileOutput> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or profile may be deleted");
    }

    return user
  }
}
