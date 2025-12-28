import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { AuthOutput, LoginInput } from "../../dto/auth-dto";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { generateTokens } from "../../../util/jwt-util";

@injectable()
export class LoginUsecase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ISessionRepository) private sessionRepository: ISessionRepository
    ) { }

    async execute(input: LoginInput): Promise<AuthOutput> {
        const user = await this.userRepository.findByUsername(input.username);

        if (!user) {
            throw new NotFoundError(`User not found`);
        }

        if (user.isDeleted) {
            throw new NotFoundError("User account has been deleted or terminated");
        }

        const matched = await bcrypt.compare(input.password, user.password);

        if (!matched) {
            throw new UnauthorizedError("Invalid credentials");
        }

        await this.sessionRepository.deleteByUserId(user.id);

        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
        });

        const sessionExpiresAt = new Date();
        sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30);

        const session = await this.sessionRepository.create({
            userId: user.id,
            token: tokens.refreshToken,
            expiresAt: sessionExpiresAt,
        });

        return {
            user: user,
            accessToken: tokens.accessToken,
            session: session,
        };
    }
}
