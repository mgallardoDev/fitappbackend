import { Injectable } from '@nestjs/common';
import { Role } from '../../domain/models/role.model';
import { EntityModelMapper, UserEntityModelMapper } from './';
import { RoleEntity } from '../typeorm/entities';

@Injectable()
export class RoleEntityModelMapper
  implements EntityModelMapper<RoleEntity, Role>
{
  toModel(entity: RoleEntity): Role {
    return new Role(entity.uid, entity.created_at, entity.enabled, entity.name);
  }

  toEntity(model: Role): RoleEntity {
    const entity = new RoleEntity();
    entity.uid = model.uid;
    entity.created_at = model.createdAt;
    entity.enabled = model.enabled;
    entity.name = model.name;
    return entity;
  }
}
