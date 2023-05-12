import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ResponseMessage
} from 'src/common/application/decorators/response-message/response-message.decorator';
import { CreateUserDto, User, UserService } from '../..';
import { UserApiResponses } from '../api-responses/user.responses';
import { GetUserDto } from '../dtos/get-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(UserApiResponses.CREATED)
  // @ApiResponse({
  //   status: 201,
  //   description: UserApiResponses.CREATED,
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
 createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post()
  // @GetResponseMessages({
  //   one: { getOneFound: 'loHay', getOneNotFound: ' no lo hay' },
  // })
  getUser(@Body() getUserDto: GetUserDto) {
    try {
      return this.userService.getUser(getUserDto);
    } catch (error) {
      console.error(error);
    }
  }
}
