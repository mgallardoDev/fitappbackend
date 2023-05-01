import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @Column('date')
  created_at: Date;
}
