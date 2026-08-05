import { z } from "zod";
import { PaginationDtoSchema } from "./pagination.dto.js";
import { FilterGroupDtoSchema } from "./filter-group.dto.js";
import { SearchDtoSchema } from "./search.dto.js";
import { SortDtoSchema } from "./sort.dto.js";
import { AggregateDtoSchema } from "./aggregate.dto.js";

/**
 * Complete frontend query contract.
 */
export const QueryDtoSchema = z.object({
  pagination: PaginationDtoSchema.optional(),
  select: z.array(z.string().min(1, "Field name must not be empty")).optional(),
  filters: FilterGroupDtoSchema.optional(),
  search: SearchDtoSchema.optional(),
  sort: z.array(SortDtoSchema).optional(),
  aggregates: z.array(AggregateDtoSchema).optional(),
  groupBy: z
    .array(z.string().min(1, "Field name must not be empty"))
    .optional(),
  distinct: z
    .array(z.string().min(1, "Field name must not be empty"))
    .optional(),
});

export type QueryDto = z.infer<typeof QueryDtoSchema>;
