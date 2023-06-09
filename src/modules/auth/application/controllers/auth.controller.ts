import { Controller, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseMessage } from 'src/common/application/decorators/response-message/response-message.decorator';
import { HttpExceptionFilter } from 'src/common/application/exception-filters/http-exception.filter';
import { AuthService } from '../../domain/services/auth.service';
import { AuthResponseMessage } from '../api-response-messages/auth.response-messages';
import { AuthRoutes } from '../api-routes/auth-routes';
import { LocalAuthGuard } from 'src/common/application/guards/local-auth.guard';

@Controller(AuthRoutes.MAIN)
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(AuthRoutes.LOGIN)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(AuthResponseMessage.SUCCES)
  async login(@Request() req) {     
     
    return {token: req.user.token};
  }
}
