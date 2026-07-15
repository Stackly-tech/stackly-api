export interface BaseServiceInterface<T> {
  findAll(): Promise<T[]>;

  findById(id: T): Promise<T | null>;

  create(dto: T): Promise<T>;

  update(dto: T): Promise<T>;

  delete(id: T): Promise<T>;

  patch(dto: T): Promise<T>;
}
