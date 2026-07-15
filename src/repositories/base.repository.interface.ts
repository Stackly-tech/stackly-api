export interface BaseRepositoryInterface<T> {
  findAll(): Promise<T[]>;

  findById(id: T): Promise<T | null>;

  create(test: T): Promise<T>;

  update(test: T): Promise<T>;

  delete(id: T): Promise<T>;
}
