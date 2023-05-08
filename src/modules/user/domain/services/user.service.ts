import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from 'src/modules/user';
import { UserTypeOrmRepository } from '../../infraestructure/typeorm/repositories/user.typeorm.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role = null } = createUserDto;

    const userExists = await this.userRepository.getByEmail(email);
    console.log(userExists) 
     
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User(name, email, password, role);
    return await this.userRepository.create(user);
  }
}
