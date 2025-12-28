import { User, UserCreate, UserUpdate } from "../entities/user-entity";

export interface IUserRepository {
    create(user: UserCreate): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    update(id: string, updates: UserUpdate): Promise<User | null>;
    delete(id: string): Promise<User | null>;
    findManyByIds(ids: string[]): Promise<User[]>;
    searchByUsername(username: string): Promise<User[]>;
}