import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, User, UserService } from '../..';
import { TransformResponseInterceptor } from 'src/common';
import { ResponseMessage } from 'src/common/application/decorators/response-message/response-message.decorator';
import { UserApiResponses } from '../api-responses/user.responses';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(UserApiResponses.CREATED)
  @ApiResponse({
    status: 201,
    description: UserApiResponses.CREATED,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
