import { Session } from "../../domain/entity/session-entity";
import { ISessionDocument } from "../model/session-model";

export class SessionMapper {
  static toDomain(doc: ISessionDocument): Session {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      token: doc.token,
      expiresAt: doc.expiresAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: ISessionDocument[]): Session[] {
    return docs.map((doc) => SessionMapper.toDomain(doc));
  }
}
