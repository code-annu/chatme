import { injectable } from "inversify";
import { User, UserCreate, UserUpdate } from "../../domain/entity/user-entity";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { UserMapper } from "../mapper/user-mapper";
import { UserModel } from "../model/user-model";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: UserCreate): Promise<User> {
    const doc = await UserModel.create({
      email: data.email,
      passwordHash: data.passwordHash,
      firstName: data.firstName,
      lastName: data.lastName ?? null,
      bio: data.bio ?? null,
      avatarUrl: data.avatarUrl ?? null,
    });
    return UserMapper.toDomain(doc);
  }

  async update(id: string, updates: UserUpdate): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true },
    );
    if (!doc) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return UserMapper.toDomain(doc);
  }

  async delete(id: string): Promise<void> {
    const doc = await UserModel.findByIdAndUpdate(id, {
      $set: { isDeleted: true, deletedAt: new Date() },
    });
    if (!doc) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email });
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const docs = await UserModel.find({ _id: { $in: ids } });
    return UserMapper.toDomainList(docs);
  }
}
