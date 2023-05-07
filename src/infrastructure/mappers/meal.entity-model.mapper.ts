import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserEntityModelMapper } from '.';
import { Meal } from '../../domain/models';
import { MealEntity } from '../typeorm/entities';
import { AsyncEntityModelMapper } from './I.async-entity-model.mapper';

@Injectable()
export class MealEntityModelMapper
  implements AsyncEntityModelMapper<MealEntity, Meal>
{
  constructor(
    @Inject(forwardRef(() => UserEntityModelMapper))
    private readonly userMapper: UserEntityModelMapper,
  ) {}

  async toModel(entity: MealEntity): Promise<Meal> {
    return new Meal(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.name,
      entity.user ? await this.userMapper.toModel(entity.user) : null,
    );
  }

  async toEntity(domain: Meal): Promise<MealEntity> {
    const entity = new MealEntity();

    entity.uid = domain.uid;
    entity.created_at = domain.createdAt;
    entity.enabled = domain.enabled;
    entity.name = domain.name;
    entity.user = domain.user
      ? await this.userMapper.toEntity(domain.user)
      : undefined;
    return entity;
  }
}
