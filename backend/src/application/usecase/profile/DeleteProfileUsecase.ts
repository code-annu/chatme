import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

@injectable()
export class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found or profile may be deleted");
    }

    await this.userRepo.delete(userId);
  }
}
