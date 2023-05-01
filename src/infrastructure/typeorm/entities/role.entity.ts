import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, UserEntity } from '.';

@Entity()
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
