import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { generateTokens } from "../../../util/jwt-util";
import { LoginInput, AuthOutput } from "../../dto/auth-dto";
import bcrypt from "bcrypt";

@injectable()
export class RefreshTokenUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository) private sessionRepo: ISessionRepository,
  ) {}

  async execute(token: string): Promise<AuthOutput> {
    const session = await this.sessionRepo.findByToken(token);
    if (!session) {
      throw new NotFoundError("Session not found");
    }
    if (session.expiresAt < new Date()) {
      await this.sessionRepo.delete(session.id);
      throw new UnauthorizedError("Session expired");
    }

    const user = await this.userRepo.findById(session.userId);
    if (!user || user.isDeleted) {
      await this.sessionRepo.delete(session.id);
      throw new NotFoundError("User not found");
    }

    await this.sessionRepo.delete(session.id);

    const { refreshToken, accessToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });
    await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken.token,
      expiresAt: refreshToken.expiresAt,
    });

    return { user, session: { accessToken, refreshToken } };
  }
}
