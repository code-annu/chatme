import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { AuthOutput, SignupInput } from "../../dto/auth-dto";
import { ConflictError } from "../../../domain/error/ConflictError";
import { generateTokens } from "../../../util/jwt-util";
import bcrypt from "bcrypt";

@injectable()
export class SignupUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private sessionRepo: ISessionRepository,
  ) {}

  async execute(data: SignupInput): Promise<AuthOutput> {
    const { firstName, lastName, email, password, avatarUrl, bio } = data;

    const user = await this.userRepo.findByEmail(email);
    if (user) {
      throw new ConflictError(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await this.userRepo.create({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      avatarUrl,
      bio,
    });

    const { refreshToken, accessToken } = generateTokens({
      userId: savedUser.id,
      email: savedUser.email,
    });
    await this.sessionRepo.create({
      userId: savedUser.id,
      token: refreshToken.token,
      expiresAt: refreshToken.expiresAt,
    });

    return { user: savedUser, session: { accessToken, refreshToken } };
  }
}
