import { User } from '../models/user.model';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
