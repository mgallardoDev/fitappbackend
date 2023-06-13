import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user';
import { AuthResponseMessage } from '../../application/api-response-messages/auth.response-messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async login(userName: string, password: string) {


    const user = await this.userRepository.getOne({ email: userName });
    if (await bcrypt.compare(password, user?.password || '')) {
      delete user.password;
      delete user.ownFoods;
      delete user.ownMeals;
      delete user.goals;
      return await this.jwtService.signAsync({ user });
    }
    throw new UnauthorizedException(AuthResponseMessage.UNATHORIZED);
  }
}
