export abstract class IService<T> {
  abstract findAll(req: T): Promise<T[]>;

  abstract findById(id: T): Promise<T | null>;

  abstract create(dto: T): Promise<T>;

  abstract update(dto: T): Promise<T>;

  abstract delete(id: T): Promise<T>;

  abstract patch(dto: T): Promise<T>;
}