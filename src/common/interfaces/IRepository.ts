export abstract class IRepository<T> {
  abstract findAll(req: T): Promise<T[]>;

  abstract findById(id: T): Promise<T | null>;

  abstract create(test: T): Promise<T>;

  abstract update(test: T): Promise<T>;

  abstract delete(id: T): Promise<T>;
}
