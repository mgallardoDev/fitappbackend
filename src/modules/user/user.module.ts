import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  FoodEntityModelMapper,
  MealEntityModelMapper,
  RoleEntityModelMapper,
  UserGoalEntityModelMapper,
} from 'src/infrastructure/mappers';
import {
  FoodEntity,
  IngestionEntity,
  MealEntity,
  UserEntity,
  UserGoalEntity
} from 'src/infrastructure/typeorm/entities';
import { UserRepository, UserService } from './';
import { UserController } from './application/controllers/user.controller';
import { UserModelDtoMapper } from './application/mappers/user.model-responsedto.mapper';
import { RoleRepository } from './domain/repositories/role.repository';
import { RoleEntity } from './infraestructure/typeorm/entities/role.entity';
import { UserEntityModelMapper } from './infraestructure/typeorm/mappers/user.entity-model.mapper';
import { RoleTypeOrmRepository } from './infraestructure/typeorm/repositories/role.typeorm.repository';
import { UserTypeOrmRepository } from './infraestructure/typeorm/repositories/user.typeorm.repository';

const UserRepositoryProvider = {
  provide: UserRepository,
  useClass: UserTypeOrmRepository,
};
const RoleRepositoryProvider = {
  provide: RoleRepository,
  useClass: RoleTypeOrmRepository,
};
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserEntity,
      MealEntity,
      FoodEntity,
      RoleEntity,
      UserGoalEntity,
      IngestionEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepositoryProvider,
    RoleRepositoryProvider,
    UserEntityModelMapper,
    MealEntityModelMapper,
    FoodEntityModelMapper,
    RoleEntityModelMapper,
    UserGoalEntityModelMapper,
    UserModelDtoMapper
  ],
  exports: [
    UserService,
    UserEntityModelMapper,
    MealEntityModelMapper,
  ],
})
export class UserModule {}
