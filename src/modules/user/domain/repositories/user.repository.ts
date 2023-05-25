import { BaseRepository } from 'src/common/domain/repositories/base.repository';
import { User } from '../models/user.model';
import { UserEntity } from '../../infraestructure/typeorm/entities/user.entity';

export interface UserRepository extends BaseRepository<User> {
  getOne(userEntity: Partial<UserEntity>): Promise<User | null>;
}
