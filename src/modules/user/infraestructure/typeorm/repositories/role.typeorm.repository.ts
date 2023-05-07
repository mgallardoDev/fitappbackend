import { Injectable } from '@nestjs/common';
import { Role } from 'src/domain/models';
import { RoleRepository } from 'src/modules/user/domain/repositories/role.repository';
import { RoleEntity } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleTypeOrmRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  getAll(): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  async getDefault(): Promise<Role> {
    return await this.roleRepository.findOne({ where: { is_default: true } });
  }
  create(model: Role): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  update(model: Role): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
