import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserEntityModelMapper } from '.';
import { Food } from '../../domain/models';
import { FoodEntity } from '../typeorm/entities';
import { AsyncEntityModelMapper } from './I.async-entity-model.mapper';

@Injectable()
export class FoodEntityModelMapper
  implements AsyncEntityModelMapper<FoodEntity, Food>
{
  constructor(
    @Inject(forwardRef(() => UserEntityModelMapper))
    private readonly userMapper: UserEntityModelMapper,
  ) {}

  async toModel(entity: FoodEntity): Promise<Food> {
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
      await this.userMapper.toModel(entity.user),
    );
  }

  async toEntity(domain: Food): Promise<FoodEntity> {
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
    entity.user = await this.userMapper.toEntity(domain.user);

    return entity;
  }
}
