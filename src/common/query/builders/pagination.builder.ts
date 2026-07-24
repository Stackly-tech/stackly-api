import type { PaginationDto } from "#common/dtos/pagination.dto.js";

export interface PaginationResult {
  readonly page?: number;
  readonly limit?: number;
  readonly offset?: number;
}

export class PaginationBuilder {
  public build(pagination?: PaginationDto): PaginationResult {
    if (
      !pagination ||
      pagination.page === undefined ||
      pagination.limit === undefined
    ) {
      return {};
    }

    return {
      page: pagination.page,
      limit: pagination.limit,
      offset: (pagination.page - 1) * pagination.limit,
    };
  }
}
