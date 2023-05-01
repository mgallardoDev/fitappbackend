import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, UserEntity } from './';

@Entity()
export class MealEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.ownMeals)
  user: UserEntity;
}
