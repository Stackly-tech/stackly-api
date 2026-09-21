import { type QueryMetadata } from "#/common/interfaces/IInternal-query.js";
import { type QueryDto } from "#/common/dtos/query.dto.js";
import { type IPrismaQueryAdapter } from "#/common/query/adapters/base-prisma.adapter.js";
import { type IRepository } from "#/common/interfaces/IRepository.js";
import { type QueryOperation } from "./query.types.js";
export type ExecuteOptions<T> = {
  dto: QueryDto;

  metadata: QueryMetadata;

  adapter: IPrismaQueryAdapter;

  repository: IRepository<T>;
  operation: QueryOperation;
  unique?: any;
};
