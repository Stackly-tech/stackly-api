import { QueryDtoSchema } from "#common/dtos/query.dto.js";
import type { QueryMetadata } from "#common/interfaces/IInternal-query.js";
export function createQuerySchema(metadata: QueryMetadata) {
  return QueryDtoSchema.superRefine((query, ctx) => {
    // select

    for (const field of query.select ?? []) {
      if (!metadata.selectableFields.includes(field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid select field: ${field}`,
        });
      }
    }

    // sort

    for (const sort of query.sort ?? []) {
      if (!metadata.sortableFields.includes(sort.field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid sortable field: ${sort.field}`,
        });
      }
    }

    // search

    for (const field of query.search?.fields ?? []) {
      if (!metadata.searchableFields.includes(field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid search field: ${field}`,
        });
      }
    }

    // aggregate

    for (const aggregate of query.aggregates ?? []) {
      if (!metadata.aggregatableFields.includes(aggregate.field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid aggregate field: ${aggregate.field}`,
        });
      }
    }
  });
}
