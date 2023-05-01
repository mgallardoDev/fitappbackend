import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  BaseEntity,
  FoodEntity,
  MealEntity,
  RoleEntity,
  UserGoalEntity,
} from './';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @OneToMany(() => FoodEntity, (food) => food.user)
  ownFoods: FoodEntity[];

  @OneToMany(() => MealEntity, (meal) => meal.user)
  ownMeals: MealEntity[];

  @OneToMany(() => UserGoalEntity, (goal) => goal.user)
  goals: UserGoalEntity[];
}
