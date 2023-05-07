import { BaseRepository } from 'src/common/domain/repositories/base.repository';
import { Role } from '../models/role.model';

export interface RoleRepository extends BaseRepository<Role> {
  getDefault(): Promise<Role>;
}
