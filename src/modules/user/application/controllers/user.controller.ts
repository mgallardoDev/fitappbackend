import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseMessage, GetResponseMessages
} from 'src/common/application/decorators/response-message/response-message.decorator';
import { CreateUserDto, User, UserService } from '../..';
import { GetUserDto } from '../dtos/get-user.dto';
import { ApiResponses } from 'src/common';
import { HttpExceptionFilter } from 'src/common/application/exception-filters/http-exception.filter';

@Controller('user')
@UseFilters(HttpExceptionFilter)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(ApiResponses.CREATED)
  @ApiResponse({
    status: 201,
    description: ApiResponses.CREATED,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
 createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post()
  @GetResponseMessages({
    one: { getOneFound: ApiResponses.GET_ONE, getOneNotFound: ApiResponses.NOT_FOUND },
  })
  getUser(@Body() getUserDto: GetUserDto):Promise<User> {
    try {
      return this.userService.getUser(getUserDto);
    } catch (error) {
      console.error(error);
    }
  }
}
