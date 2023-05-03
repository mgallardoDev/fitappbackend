import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories';
import { UserEntity } from '../entities';
import { User } from '../../../domain/models';
import { UserEntityModelMapper } from 'src/infrastructure/mappers';
import { InjectRepository } from '@nestjs/typeorm';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mapper: UserEntityModelMapper,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.mapper.toModel(user));
  }

  async getById(uid: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { uid } });
    if (!user) return null;
    return this.mapper.toModel(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;
    return this.mapper.toModel(user);
  }

  async create(user: User): Promise<User> {
    const userEntity = this.mapper.toEntity(user);
    return this.mapper.toModel(await this.userRepository.save(userEntity));
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.uid, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
