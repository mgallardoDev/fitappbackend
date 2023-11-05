import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, User, UserRepository } from 'src/modules/user';
import { UserApiResponses } from '../../application/api-response-messages/user.response-messages';
import { GetUserDto } from '../../application/dtos/get-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserModelDtoMapper } from '../../application/mappers/user.model-responsedto.mapper';
import { UserResponseDto } from '../../application/dtos/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly mapper: UserModelDtoMapper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role = null } = createUserDto;
    const userExists = await this.userRepository.getOne({ email });
    if (userExists) {
      throw new ConflictException(UserApiResponses.USER_ALREADY_EXISTS);
    }
    const saltRounds = Number.parseInt(
      this.configService.get('BCRYPT_SALT_ROUNDS'),
    );
    const encriptedPassWord = bcrypt.hashSync(password, saltRounds);
    const user = new User(name, email, encriptedPassWord, role);
    return await this.userRepository.create(user);
  }

  async getUser(getUserDto: GetUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.getOne(getUserDto);
    if (!user) {
      throw new NotFoundException(UserApiResponses.USER_NOT_FOUND);
    }
    return this.mapper.toUserDto(user);
  }
}
