import { injectable } from "inversify";
import { ISessionRepository } from "../../domain/repository/ISessionRepository";
import { Session, SessionCreate } from "../../domain/entities/session-entity";
import { SessionModel } from "../model/session-model";
import { SessionMapper } from "../mapper/session-mapper";

@injectable()
export class SessionRepository implements ISessionRepository {
  async create(session: SessionCreate): Promise<Session> {
    const newSession = await SessionModel.create({
      userId: session.userId,
      token: session.token,
      expiresAt: session.expiresAt,
    });
    return SessionMapper.toDomain(newSession);
  }

  async findById(id: string): Promise<Session | null> {
    const session = await SessionModel.findById(id);
    return session ? SessionMapper.toDomain(session) : null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const session = await SessionModel.findOne({ token });
    return session ? SessionMapper.toDomain(session) : null;
  }

  async findByUserId(userId: string): Promise<Session | null> {
    const session = await SessionModel.findOne({ userId });
    return session ? SessionMapper.toDomain(session) : null;
  }

  async delete(id: string): Promise<Session | null> {
    const session = await SessionModel.findByIdAndDelete(id);
    return session ? SessionMapper.toDomain(session) : null;
  }

  async deleteByUserId(userId: string): Promise<Session | null> {
    const session = await SessionModel.findOneAndDelete({ userId });
    return session ? SessionMapper.toDomain(session) : null;
  }

  async deleteByToken(token: string): Promise<Session | null> {
    const session = await SessionModel.findOneAndDelete({ token });
    return session ? SessionMapper.toDomain(session) : null;
  }
}
