import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, User, UserRepository } from 'src/modules/user';
import { UserApiResponses } from '../../application/api-responses/user.responses';
import { GetUserDto } from '../../application/dtos/get-user.dto';
import { UserEntityModelMapper } from '../../infraestructure/typeorm/mappers/user.entity-model.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly userMapper: UserEntityModelMapper) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role = null } = createUserDto;
    const userExists = await this.userRepository.getOne({email});
    if (userExists) {
      throw new ConflictException (UserApiResponses.USER_ALREADY_EXISTS);
    }
    const user = new User(name, email, password, role);
    return await this.userRepository.create(user);
  }

  async getUser(getUserDto: GetUserDto): Promise<User> {

    return await this.userRepository.getOne(getUserDto)
  }
}
