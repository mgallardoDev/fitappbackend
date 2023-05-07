import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../../infrastructure/typeorm/entities';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;
}
