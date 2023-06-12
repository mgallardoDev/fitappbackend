import { BaseRepository } from 'src/common/domain/repositories/base.repository';
import { Role } from '../models/role.model';

export abstract class RoleRepository extends BaseRepository<Role> {
  abstract getDefault(): Promise<Role>;
}
