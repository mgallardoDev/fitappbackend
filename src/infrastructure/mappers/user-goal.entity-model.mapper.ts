import { Injectable } from '@nestjs/common';
import { UserEntityModelMapper } from '.';
import { UserGoal } from '../../domain/models';
import { UserGoalEntity } from '../typeorm/entities';
import { EntityModelMapper } from './I.entity-model.mapper';

@Injectable()
export class UserGoalEntityModelMapper
  implements EntityModelMapper<UserGoalEntity, UserGoal>
{
  constructor(private readonly userMapper: UserEntityModelMapper) {}

  toModel(entity: UserGoalEntity): UserGoal {
    return new UserGoal(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.date,
      entity.kcal,
      entity.protein,
      entity.carbohydrates,
      entity.fat,
      entity.user ? this.userMapper.toModel(entity.user) : null,
    );
  }

  toEntity(domain: UserGoal): UserGoalEntity {
    const entity = new UserGoalEntity();

    entity.uid = domain.uid;
    entity.created_at = domain.createdAt;
    entity.enabled = domain.enabled;
    entity.date = domain.date;
    entity.kcal = domain.kcal;
    entity.protein = domain.protein;
    entity.carbohydrates = domain.carbohydrates;
    entity.fat = domain.fat;
    entity.user = domain.user
      ? this.userMapper.toEntity(domain.user)
      : undefined;

    return entity;
  }
}
