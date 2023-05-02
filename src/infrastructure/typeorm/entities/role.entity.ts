import { Column, Entity } from 'typeorm';
import { BaseEntity } from '.';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;
}
