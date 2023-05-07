import { Injectable } from '@nestjs/common';
import { Role } from '../../../domain/models/role.model';
import { RoleEntity } from '../../../../../infrastructure/typeorm/entities';
import { EntityModelMapper } from '../../../../../infrastructure/mappers';

@Injectable()
export class RoleEntityModelMapper
  implements EntityModelMapper<RoleEntity, Role>
{
  toModel(entity: RoleEntity): Role {
    console.log(entity);

    return new Role(entity.name, entity.uid, entity.created_at, entity.enabled);
  }

  toEntity(model: Role): RoleEntity {
    console.log(model);

    const entity = new RoleEntity();
    entity.uid = model.uid;
    entity.created_at = model.createdAt;
    entity.enabled = model.enabled;
    entity.name = model.name;
    return entity;
  }
}
