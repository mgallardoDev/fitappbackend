import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, IngestionEntity, UserEntity } from '.';

@Entity()
export class FoodEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  brand?: string;

  @Column()
  calories: number;

  @Column()
  protein: number;

  @Column()
  carbs: number;

  @Column()
  fat: number;

  @Column()
  serving_size: number;

  @Column()
  serving_unit: string;

  @ManyToOne(() => UserEntity, (user) => user.ownFoods, { nullable: true })
  user?: UserEntity;

  @OneToMany(() => IngestionEntity, (ingestion) => ingestion.food)
  ingestions: IngestionEntity[];
}
