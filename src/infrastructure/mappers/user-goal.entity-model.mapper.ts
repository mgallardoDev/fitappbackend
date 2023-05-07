import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserEntityModelMapper } from '.';
import { UserGoal } from '../../domain/models';
import { UserGoalEntity } from '../typeorm/entities';
import { EntityModelMapper } from './I.entity-model.mapper';
import { AsyncEntityModelMapper } from './I.async-entity-model.mapper';

@Injectable()
export class UserGoalEntityModelMapper
  implements AsyncEntityModelMapper<UserGoalEntity, UserGoal>
{
  constructor(
    @Inject(forwardRef(() => UserEntityModelMapper))
    private readonly userMapper: UserEntityModelMapper,
  ) {}

  async toModel(entity: UserGoalEntity): Promise<UserGoal> {
    return new UserGoal(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.date,
      entity.kcal,
      entity.protein,
      entity.carbohydrates,
      entity.fat,
      entity.user ? await this.userMapper.toModel(entity.user) : null,
    );
  }

  async toEntity(domain: UserGoal): Promise<UserGoalEntity> {
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
      ? await this.userMapper.toEntity(domain.user)
      : undefined;

    return entity;
  }
}
