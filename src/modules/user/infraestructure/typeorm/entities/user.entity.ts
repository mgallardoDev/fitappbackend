import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  BaseEntity,
  FoodEntity,
  IngestionEntity,
  MealEntity,
  RoleEntity,
  UserGoalEntity,
} from '../../../../../infrastructure/typeorm/entities';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @OneToMany(() => FoodEntity, (food) => food.user)
  ownFoods: FoodEntity[];

  @OneToMany(() => MealEntity, (meal) => meal.user)
  ownMeals: MealEntity[];

  @OneToMany(() => UserGoalEntity, (goal) => goal.user)
  goals: UserGoalEntity[];

  @OneToMany(() => IngestionEntity, (ingestion) => ingestion.user)
  ingestions: IngestionEntity[];
}
