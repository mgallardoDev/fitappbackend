export interface EntityModelMapper<E, D> {
  toModel(entity: E): D;
  toEntity(domain: D): E;
}
