export interface AsyncEntityModelMapper<E, D> {
  toModel(entity: E): Promise<D>;
  toEntity(domain: D): Promise<E>;
}
