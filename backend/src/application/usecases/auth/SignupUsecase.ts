import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { AuthOutput, SignupInput } from "../../dto/auth-dto";
import { generateTokens } from "../../../util/jwt-util";
import { ConflictError } from "../../../domain/error/ConflictError";
import bcrypt from "bcrypt";

@injectable()
export class SignupUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private sessionRepository: ISessionRepository
  ) {}

  async execute(input: SignupInput): Promise<AuthOutput> {
    const existingUser = await this.userRepository.findByUsername(
      input.username
    );

    if (existingUser) {
      throw new ConflictError(`Username ${input.username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = await this.userRepository.create({
      username: input.username,
      password: hashedPassword,
      fullname: input.fullname,
      profilePictureUrl: input.profilePictureUrl,
      bio: input.bio,
    });

    const tokens = generateTokens({
      userId: newUser.id,
      username: newUser.username,
    });

    // Session expiration logic could be aligned with refresh token expiration or custom
    const sessionExpiresAt = new Date();
    sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30); // Default 30 days

    const session = await this.sessionRepository.create({
      userId: newUser.id,
      token: tokens.refreshToken,
      expiresAt: sessionExpiresAt,
    });

    return {
      user: newUser,
      accessToken: tokens.accessToken,
      session: session,
    };
  }
}
