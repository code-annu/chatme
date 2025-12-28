import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { ISessionRepository } from "../../../domain/repository/ISessionRepository";
import { AuthOutput } from "../../dto/auth-dto";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { generateTokens } from "../../../util/jwt-util";


@injectable()
export class RefreshTokenUsecase {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ISessionRepository) private sessionRepository: ISessionRepository
    ) { }

    async execute(token: string): Promise<AuthOutput> {
        const session = await this.sessionRepository.findByToken(token);

        if (!session) {
            throw new UnauthorizedError("Session not found or invalid");
        }

        if (new Date() > session.expiresAt) {
            await this.sessionRepository.delete(session.id);
            throw new UnauthorizedError("Session expired");
        }

        const user = await this.userRepository.findById(session.userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }
        if (user.isDeleted) {
            throw new UnauthorizedError("User account has been deleted or terminated");
        }

        const tokens = generateTokens({
            userId: user.id,
            username: user.username,
        });

        await this.sessionRepository.delete(session.id);

        const sessionExpiresAt = new Date();
        sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30);

        const newSession = await this.sessionRepository.create({
            userId: user.id,
            token: tokens.refreshToken,
            expiresAt: sessionExpiresAt,
        });

        return {
            user: user,
            accessToken: tokens.accessToken,
            session: newSession,
        };
    }
}
