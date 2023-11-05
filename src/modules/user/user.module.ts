import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserTypeOrmRepository } from './infraestructure/typeorm/repositories/user.typeorm.repository';
import { UserController } from './application/controllers/user.controller';
import { UserService, UserRepository } from './';
import { RoleEntity } from './infraestructure/typeorm/entities/role.entity';
import {
  BaseEntity,
  FoodEntity,
  IngestionEntity,
  MealEntity,
  UserEntity,
  UserGoalEntity,
} from 'src/infrastructure/typeorm/entities';
import { UserTypeOrmRepository } from './infraestructure/typeorm/repositories/user.typeorm.repository';
import { UserEntityModelMapper } from './infraestructure/typeorm/mappers/user.entity-model.mapper';
import {
  FoodEntityModelMapper,
  MealEntityModelMapper,
  RoleEntityModelMapper,
  UserGoalEntityModelMapper,
} from 'src/infrastructure/mappers';
import { RoleTypeOrmRepository } from './infraestructure/typeorm/repositories/role.typeorm.repository';
import { RoleRepository } from './domain/repositories/role.repository';
import { ConfigModule } from '@nestjs/config';
import { UserModelDtoMapper } from './application/mappers/user.model-responsedto.mapper';

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
