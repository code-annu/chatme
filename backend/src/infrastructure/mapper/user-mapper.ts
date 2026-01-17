import { User } from "../../domain/entity/user-entity";
import { IUserDocument } from "../model/user-model";

export class UserMapper {
  static toDomain(doc: IUserDocument): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      firstName: doc.firstName,
      lastName: doc.lastName,
      bio: doc.bio,
      avatarUrl: doc.avatarUrl,
      isVerified: doc.isVerified,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      lastActiveAt: doc.lastActiveAt,
      isOnline: doc.isOnline,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  static toDomainList(docs: IUserDocument[]): User[] {
    return docs.map((doc) => UserMapper.toDomain(doc));
  }
}
