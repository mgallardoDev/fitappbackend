import { Module } from '@nestjs/common';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
