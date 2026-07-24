import type { PaginationDto } from "./pagination.dto.js";
import type { FilterGroupDto } from "./filter-group.dto.js";
import type { SearchDto } from "./search.dto.js";
import type { SortDto } from "./sort.dto.js";
import type { AggregateDto } from "./aggregate.dto.js";

/**
 * Complete frontend query contract.
 */
export interface QueryDto {
  readonly pagination?: PaginationDto;

  readonly select?: readonly string[];

  readonly filters?: FilterGroupDto;

  readonly search?: SearchDto;

  readonly sort?: readonly SortDto[];

  readonly aggregate?: readonly AggregateDto[];

  readonly groupBy?: readonly string[];

  readonly distinct?: readonly string[];
}
