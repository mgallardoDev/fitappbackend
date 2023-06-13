import { Module } from '@nestjs/common';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/infraestructure/typeorm/entities/user.entity';
import { UserRepository } from '../user';
import { UserTypeOrmRepository } from '../user/infraestructure/typeorm/repositories/user.typeorm.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/passport-strategy/local-strategy';
import { JwtStrategy } from './application/passport-strategy/jwt.strategy';

const UserRepositoryProvider = {
  provide: UserRepository,
  useClass: UserTypeOrmRepository,
};
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserRepositoryProvider],
})
export class AuthModule {}
