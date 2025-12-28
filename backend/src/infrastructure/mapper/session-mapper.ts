import { Session } from "../../domain/entities/session-entity";
import { SessionDocument } from "../model/session-model";

export class SessionMapper {
    static toDomain(doc: SessionDocument): Session {
        return {
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            token: doc.token,
            expiresAt: doc.expiresAt,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}
