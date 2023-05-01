import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, IngestionEntity, UserEntity } from './';

@Entity()
export class MealEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.ownMeals)
  user: UserEntity;

  @OneToMany(() => IngestionEntity, (ingestion) => ingestion.meal)
  ingestions: IngestionEntity[];
}
