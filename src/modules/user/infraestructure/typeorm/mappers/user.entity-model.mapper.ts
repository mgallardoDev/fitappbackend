import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { AsyncEntityModelMapper } from 'src/infrastructure/mappers/I.async-entity-model.mapper';
import { User } from 'src/modules/user';
import { RoleRepository } from 'src/modules/user/domain/repositories/role.repository';
import {
  FoodEntityModelMapper,
  MealEntityModelMapper,
  RoleEntityModelMapper,
  UserGoalEntityModelMapper,
} from '../../../../../infrastructure/mappers';
import { UserEntity } from '../../../../../infrastructure/typeorm/entities';

@Injectable()
export class UserEntityModelMapper
  implements AsyncEntityModelMapper<UserEntity, User>
{
  constructor(
    @Inject(forwardRef(() => RoleRepository))
    private roleRepository: RoleRepository,
    @Inject(forwardRef(() => MealEntityModelMapper))
    private mealMapper: MealEntityModelMapper,
    @Inject(forwardRef(() => FoodEntityModelMapper))
    private foodMapper: FoodEntityModelMapper,
    @Inject(forwardRef(() => RoleEntityModelMapper))
    private roleMapper: RoleEntityModelMapper,
    @Inject(forwardRef(() => UserGoalEntityModelMapper))
    private userGoalMapper: UserGoalEntityModelMapper,
  ) {}

  async toModel(entity: UserEntity): Promise<User> {
    const role = this.roleMapper.toModel(entity.role);
    const ownFoods = entity.ownFoods
      ? await Promise.all(
          entity.ownFoods.map((food) => this.foodMapper.toModel(food)),
        )
      : [];
    const ownMeals = entity.ownMeals
      ? await Promise.all(
          entity.ownMeals?.map((meal) => this.mealMapper.toModel(meal)),
        )
      : [];
    const goals = entity.goals
      ? await Promise.all(
          entity.goals?.map((goal) => this.userGoalMapper.toModel(goal)),
        )
      : [];

    return new User(
      entity.name,
      entity.email,
      entity.password,  
      role,
      entity.uid,
      entity.created_at,
      entity.enabled,
      ownFoods,
      ownMeals,
      goals,
    );
  }

  async toEntity(model: User): Promise<UserEntity> {
    const role = this.roleMapper.toEntity(
      model.role ?? (await this.roleRepository.getDefault()),
    );

    const ownFoods = await Promise.all(
      model.ownFoods?.map((food) => this.foodMapper.toEntity(food)),
    );
    const ownMeals = await Promise.all(
      model.ownMeals?.map((meal) => this.mealMapper.toEntity(meal)),
    );
    const goals = await Promise.all(
      model.goals?.map((goal) => this.userGoalMapper.toEntity(goal)),
    );
    // TODO cambiar el aproach y no usar un new Entoty sino traerse el entity existente en la BD
    const entity = new UserEntity();
    entity.created_at = model.createdAt;
    entity.email = model.email;
    entity.enabled = model.enabled;
    entity.goals = goals;
    entity.name = model.name;
    entity.ownFoods = ownFoods;
    entity.ownMeals = ownMeals;
    entity.password = model.password;
    entity.role = role;
    entity.uid = model.uid;
    return entity;
  }
}
