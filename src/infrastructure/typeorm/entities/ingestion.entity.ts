import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity, FoodEntity, MealEntity, UserEntity } from './';

@Entity('ingestion')
export class IngestionEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  ingestionType: string;

  @ManyToOne(() => UserEntity, (user) => user.ingestions)
  user: UserEntity;

  @ManyToOne(() => FoodEntity, (food) => food.ingestions)
  food: FoodEntity;

  @ManyToOne(() => MealEntity, (meal) => meal.ingestions)
  meal: MealEntity;

  @Column('date')
  date: Date;
}
