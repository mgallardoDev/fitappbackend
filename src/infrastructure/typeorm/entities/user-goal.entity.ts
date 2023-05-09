import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, UserEntity } from '.';

@Entity('user_goal')
export class UserGoalEntity extends BaseEntity {
  @Column('date')
  date: Date;

  @Column('decimal', { precision: 5, scale: 2 })
  kcal: number;

  @Column('decimal', { precision: 5, scale: 2 })
  protein: number;

  @Column('decimal', { precision: 5, scale: 2 })
  carbohydrates: number;

  @Column('decimal', { precision: 5, scale: 2 })
  fat: number;

  @ManyToOne(() => UserEntity, (user) => user.goals)
  user: UserEntity;
}
