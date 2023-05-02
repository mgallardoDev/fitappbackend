import { Injectable } from '@nestjs/common';
import { UserEntityModelMapper } from '.';
import { Meal } from '../../domain/models';
import { MealEntity } from '../typeorm/entities';
import { EntityModelMapper } from './I.entity-model.mapper';

@Injectable()
export class MealEntityModelMapper
  implements EntityModelMapper<MealEntity, Meal>
{
  constructor(private readonly userMapper: UserEntityModelMapper) {}

  toModel(entity: MealEntity): Meal {
    return new Meal(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.name,
      entity.user ? this.userMapper.toModel(entity.user) : null,
    );
  }

  toEntity(domain: Meal): MealEntity {
    const entity = new MealEntity();

    entity.uid = domain.uid;
    entity.created_at = domain.createdAt;
    entity.enabled = domain.enabled;
    entity.name = domain.name;
    entity.user = domain.user
      ? this.userMapper.toEntity(domain.user)
      : undefined;
    return entity;
  }
}
