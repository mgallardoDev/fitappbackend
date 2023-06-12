export abstract class BaseRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract getByUid(id: string): Promise<T | null>;
  abstract create(model: T): Promise<T>;
  abstract update(model: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
