import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../../../infrastructure/typeorm/entities';
import { UserEntityModelMapper } from 'src/infrastructure/mappers';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user';

export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userMapper: UserEntityModelMapper,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    const usersModels = Promise.all(
      users.map(async (user) => await this.userMapper.toModel(user)),
    );
    return usersModels;
  }

  async getById(uid: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { uid } });
    if (!user) return null;
    return this.userMapper.toModel(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] });
    console.log(user)     
    return user ? this.userMapper.toModel(user) : null;
  }

  async create(user: User): Promise<User> {
    const userEntity = await this.userMapper.toEntity(user);
    const created = await this.userRepository.save(userEntity);

    return this.userMapper.toModel(created);
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user.uid, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
