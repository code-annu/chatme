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
export class LoginUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository) private sessionRepo: ISessionRepository,
  ) {}

  async execute(data: LoginInput): Promise<AuthOutput> {
    const { email, password } = data;
    const user = await this.userRepo.findByEmail(email);
    if (!user || user.isDeleted) {
      throw new NotFoundError(`User with email ${email} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const existingSession = await this.sessionRepo.findByUserId(user.id);
    if (existingSession) {
      await this.sessionRepo.delete(existingSession.id);
    }

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
