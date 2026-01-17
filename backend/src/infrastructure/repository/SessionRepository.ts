import { injectable } from "inversify";
import { Session, SessionCreate } from "../../domain/entity/session-entity";
import { ISessionRepository } from "../../domain/repository/ISessionRepository";
import { SessionMapper } from "../mapper/session-mapper";
import { SessionModel } from "../model/session-model";

@injectable()
export class SessionRepository implements ISessionRepository {
  async create(data: SessionCreate): Promise<Session> {
    const doc = await SessionModel.create({
      userId: data.userId,
      token: data.token,
      expiresAt: data.expiresAt,
    });
    return SessionMapper.toDomain(doc);
  }

  async findById(id: string): Promise<Session | null> {
    const doc = await SessionModel.findById(id);
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<Session | null> {
    const doc = await SessionModel.findOne({ userId });
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const doc = await SessionModel.findOne({ token });
    return doc ? SessionMapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await SessionModel.findByIdAndDelete(id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await SessionModel.deleteMany({ userId });
  }

  async deleteByToken(token: string): Promise<void> {
    await SessionModel.deleteOne({ token });
  }
}
