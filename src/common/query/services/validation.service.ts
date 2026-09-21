import { QueryDtoSchema } from "#/common/dtos/query.dto.js";
import type { QueryMetadata } from "#/common/interfaces/IInternal-query.js";
export function createQuerySchema(metadata: QueryMetadata) {
  return QueryDtoSchema.superRefine((query, ctx) => {
    const selectable = new Set(metadata.selectableFields);
    const sortable = new Set(metadata.sortableFields);
    const searchable = new Set(metadata.searchableFields);
    const aggregatable = new Set(metadata.aggregatableFields);

    for (const field of query.select ?? []) {
      if (!selectable.has(field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid select field: ${field}`,
        });
      }
    }

    // sort

    for (const sort of query.sort ?? []) {
      if (!sortable.has(sort.field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid sortable field: ${sort.field}`,
        });
      }
    }

    // search

    for (const field of query.search?.fields ?? []) {
      if (!searchable.has(field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid search field: ${field}`,
        });
      }
    }

    // aggregate

    for (const aggregate of query.aggregates ?? []) {
      if (!aggregatable.has(aggregate.field)) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid aggregate field: ${aggregate.field}`,
        });
      }
    }
  });
}
