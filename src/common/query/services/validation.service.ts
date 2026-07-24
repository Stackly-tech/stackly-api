import { isAggregateFunction } from "../contract/aggregate-functions.js";
import { isLogicalOperator } from "../contract/logical-operators.js";
import { isFilterOperator } from "../contract/operators.js";
import { isSortDirection } from "../contract/sort-directions.js";
import type { QueryDto } from "#common/dtos/query.dto.js";
import type { QueryMetadata } from "#common/interfaces/IInternal-query.js";
export class ValidationService {
  public validate(query: QueryDto, metadata: QueryMetadata): void {
    this.validatePagination(query);
    this.validateSelections(query, metadata);
    this.validateSorting(query, metadata);
    this.validateSearch(query, metadata);
    this.validateAggregates(query, metadata);
    if (query.filters) {
      this.validateFilterGroup(query.filters, metadata);
    }
  }

  public validatePagination(query: QueryDto): void {
    const page = query.pagination?.page;
    const limit = query.pagination?.limit;

    if (page !== undefined && page < 1) {
      throw new Error("Invalid page.");
    }

    if (limit !== undefined && limit < 1) {
      throw new Error("Invalid limit.");
    }
  }

  public validateSelections(query: QueryDto, metadata: QueryMetadata): void {
    for (const field of query.select ?? []) {
      if (!metadata.selectableFields.includes(field)) {
        throw new Error(`Invalid select field: ${field}`);
      }
    }
  }

  public validateSorting(query: QueryDto, metadata: QueryMetadata): void {
    for (const item of query.sort ?? []) {
      if (!isSortDirection(item.direction)) {
        throw new Error("Invalid sort direction.");
      }

      if (!metadata.sortableFields.includes(item.field)) {
        throw new Error(`Invalid sortable field: ${item.field}`);
      }
    }
  }

  validateSearch(query: QueryDto, metadata: QueryMetadata): void {
    for (const field of query.search?.fields ?? []) {
      if (!metadata.searchableFields.includes(field)) {
        throw new Error(`Invalid search field: ${field}`);
      }
    }
  }

  validateAggregates(query: QueryDto, metadata: QueryMetadata): void {
    for (const aggregate of query.aggregate ?? []) {
      if (!isAggregateFunction(aggregate.function)) {
        throw new Error("Invalid aggregate function.");
      }

      if (!metadata.aggregatableFields.includes(aggregate.field)) {
        throw new Error(`Invalid aggregate field: ${aggregate.field}`);
      }
    }
  }

  validateFilterGroup(
    group: {
      operator: string;
      rules: readonly unknown[];
    },
    metadata: QueryMetadata,
  ): void {
    if (!isLogicalOperator(group.operator)) {
      throw new Error(`Invalid logical operator: ${group.operator}`);
    }

    for (const item of group.rules) {
      if (typeof item === "object" && item !== null && "rules" in item) {
        this.validateFilterGroup(
          item as {
            operator: string;
            rules: readonly unknown[];
          },
          metadata,
        );

        continue;
      }
      const rule = item as {
        field: string;
        operator: string;
      };

      if (!metadata.filterableFields.includes(rule.field)) {
        throw new Error(`Invalid filter field: ${rule.field}`);
      }

      if (!isFilterOperator(rule.operator)) {
        throw new Error(`Invalid filter operator: ${rule.operator}`);
      }
    }
  }
}
export type TValidationService = ValidationService;
