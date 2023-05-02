import { Injectable } from '@nestjs/common';

import { User } from 'src/domain/models';
import {
  FoodEntityModelMapper,
  MealEntityModelMapper,
  RoleEntityModelMapper,
  UserGoalEntityModelMapper,
} from '.';
import { UserEntity } from '../typeorm/entities';
import { EntityModelMapper } from './I.entity-model.mapper';

@Injectable()
export class UserEntityModelMapper
  implements EntityModelMapper<UserEntity, User>
{
  constructor(
    private readonly roleMapper: RoleEntityModelMapper,
    private readonly foodMapper: FoodEntityModelMapper,
    private readonly mealMapper: MealEntityModelMapper,
    private readonly userGoalMapper: UserGoalEntityModelMapper,
  ) {}

  toModel(entity: UserEntity): User {
    const role = this.roleMapper.toModel(entity.role);
    const ownFoods = entity.ownFoods?.map((food) =>
      this.foodMapper.toModel(food),
    );
    const ownMeals = entity.ownMeals?.map((meal) =>
      this.mealMapper.toModel(meal),
    );
    const goals = entity.goals?.map((goal) =>
      this.userGoalMapper.toModel(goal),
    );

    return new User(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.email,
      entity.password,
      role,
      ownFoods,
      ownMeals,
      goals,
    );
  }

  toEntity(model: User): UserEntity {
    const role = this.roleMapper.toEntity(model.role);
    const ownFoods = model.ownFoods?.map((food) =>
      this.foodMapper.toEntity(food),
    );
    const ownMeals = model.ownMeals?.map((meal) =>
      this.mealMapper.toEntity(meal),
    );
    const goals = model.goals?.map((goal) =>
      this.userGoalMapper.toEntity(goal),
    );

    const entity = new UserEntity();
    entity.email = model.email;
    entity.password = model.password;
    entity.role = role;
    entity.ownFoods = ownFoods;
    entity.ownMeals = ownMeals;
    entity.goals = goals;
    entity.uid = model.uid;
    entity.created_at = model.createdAt;
    entity.enabled = model.enabled;
    return entity;
  }
}
