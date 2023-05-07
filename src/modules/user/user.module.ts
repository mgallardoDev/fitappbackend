import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserTypeOrmRepository } from './infraestructure/typeorm/repositories/user.typeorm.repository';
import { UserController } from './application/controllers/user.controller';
import { UserService } from './domain/services/user.service';
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

@Module({
  imports: [
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
    UserTypeOrmRepository,
    RoleTypeOrmRepository,
    UserEntityModelMapper,
    MealEntityModelMapper,
    FoodEntityModelMapper,
    RoleEntityModelMapper,
    UserGoalEntityModelMapper,
  ],
  exports: [
    UserService,
    UserTypeOrmRepository,
    RoleTypeOrmRepository,
    UserEntityModelMapper,
    MealEntityModelMapper,
  ],
})
export class UserModule {}
