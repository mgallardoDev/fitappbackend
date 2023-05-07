import { BaseRepository } from 'src/common/domain/repositories/base.repository';
import { User } from '../models/user.model';

export interface UserRepository extends BaseRepository<User> {
  getByEmail(email: string): Promise<User | null>;
}
