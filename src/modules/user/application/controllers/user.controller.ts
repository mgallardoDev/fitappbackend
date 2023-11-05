import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponses } from 'src/common';
import { CommonRoutes } from 'src/common/application/api-routes/common-routes';
import { ResponseMessage } from 'src/common/application/decorators/response-message/response-message.decorator';
import { HttpExceptionFilter } from 'src/common/application/exception-filters/http-exception.filter';
import { JwtAuthGuard } from 'src/common/application/guards/jwt-auth.guard';
import { CreateUserDto, User, UserService } from '../..';
import { UserRoutes } from '../api-routes/user-routes';
import { GetUserDto } from '../dtos/get-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Controller(UserRoutes.MAIN)
@UseFilters(HttpExceptionFilter)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(CommonRoutes.CREATE)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(ApiResponses.CREATED)
  @ApiResponse({
    status: 201,
    description: ApiResponses.CREATED,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(ApiResponses.GET_ONE)
  getUser(@Query() getUserDto: GetUserDto): Promise<UserResponseDto> {
    return this.userService.getUser(getUserDto);
  }
}
