export interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(model: T): Promise<T>;
  update(model: T): Promise<void>;
  delete(id: string): Promise<void>;
}
