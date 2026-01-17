import { Session, SessionCreate } from "../entity/session-entity";

export interface ISessionRepository {
  create(data: SessionCreate): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  findByUserId(userId: string): Promise<Session | null>;
  findByToken(token: string): Promise<Session | null>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
  deleteByToken(token: string): Promise<void>;
}
