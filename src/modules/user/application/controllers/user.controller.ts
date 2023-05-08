import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, User, UserService } from '../..';
import { TransformResponseInterceptor } from 'src/common';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  //TODO crear decoradore ResponseMessage que inyecte el mensaje de respuesta y meterlo en el TransformResponseInterceptor
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransformResponseInterceptor)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
