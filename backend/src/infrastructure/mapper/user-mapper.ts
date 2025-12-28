import { User } from "../../domain/entities/user-entity";
import { UserDocument } from "../model/user-model";

export class UserMapper {
    static toDomain(doc: UserDocument): User {
        return {
            id: doc._id.toString(),
            username: doc.username,
            password: doc.password || "", // Should be handled carefully, maybe not exposed in domain user usually
            fullname: doc.fullname,
            profilePictureUrl: doc.profilePictureUrl || null,
            bio: doc.bio || null,
            isDeleted: doc.isDeleted,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}
