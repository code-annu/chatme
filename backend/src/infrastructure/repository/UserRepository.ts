import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import {
  User,
  UserCreate,
  UserUpdate,
} from "../../domain/entities/user-entity";
import { UserModel } from "../model/user-model";
import { UserMapper } from "../mapper/user-mapper";

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: UserCreate): Promise<User> {
    const newUser = await UserModel.create({
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
    });
    return UserMapper.toDomain(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: string, updates: UserUpdate): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    return user ? UserMapper.toDomain(user) : null;
  }

  async delete(id: string): Promise<User | null> {
    // Soft delete
    const user = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return user ? UserMapper.toDomain(user) : null;
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    const users = await UserModel.find({ _id: { $in: ids } });
    return users.map(UserMapper.toDomain);
  }

  async searchByUsername(username: string): Promise<User[]> {
    const users = await UserModel.find({
      username: { $regex: username, $options: "i" },
      isDeleted: false,
    });
    return users.map(UserMapper.toDomain);
  }
}
