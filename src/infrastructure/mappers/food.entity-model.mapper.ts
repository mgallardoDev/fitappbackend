import { Injectable } from '@nestjs/common';
import { EntityModelMapper } from './I.entity-model.mapper';
import { Food } from '../../domain/models';
import { FoodEntity } from '../typeorm/entities';
import { UserEntityModelMapper } from '.';

@Injectable()
export class FoodEntityModelMapper
  implements EntityModelMapper<FoodEntity, Food>
{
  constructor(private readonly userMapper: UserEntityModelMapper) {}

  toModel(entity: FoodEntity): Food {
    return new Food(
      entity.uid,
      entity.created_at,
      entity.enabled,
      entity.name,
      entity.brand ?? null,
      entity.calories,
      entity.protein,
      entity.carbs,
      entity.fat,
      entity.serving_size,
      entity.serving_unit,
      this.userMapper.toModel(entity.user),
    );
  }

  toEntity(domain: Food): FoodEntity {
    const entity = new FoodEntity();

    entity.uid = domain.uid;
    entity.created_at = domain.createdAt;
    entity.enabled = domain.enabled;
    entity.name = domain.name;
    entity.brand = domain.brand ?? undefined;
    entity.calories = domain.calories;
    entity.protein = domain.protein;
    entity.carbs = domain.carbs;
    entity.fat = domain.fat;
    entity.serving_size = domain.servingSize;
    entity.serving_unit = domain.servingUnit;
    entity.user = this.userMapper.toEntity(domain.user);

    return entity;
  }
}
