import type { AggregateFunction } from "../query/contract/aggregate-functions.js";
import type { LogicalOperator } from "../query/contract/logical-operators.js";
import type { FilterOperator } from "../query/contract/operators.js";
import type { SortDirection } from "../query/contract/sort-directions.js";

/**
 * Internal normalized filter.
 */
export interface InternalFilterRule {
  readonly field: string;
  readonly operator: FilterOperator;
  readonly value?: unknown;
}

/**
 * Internal normalized filter group.* */
export interface InternalFilterGroup {
  readonly operator: LogicalOperator;
  readonly rules: readonly (InternalFilterRule | InternalFilterGroup)[];
}

/*** * Internal sort model.
 */
export interface InternalSort {
  readonly field: string;
  readonly direction: SortDirection;
}

/**
 * Intern*l aggregate model.
 */
export interface InternalAggregate {
  readonly function: AggregateFunction;
  readonly field: string;
  readonly alias: string;
}

export interface IPaginationResult {
  readonly page?: number;
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Internal que*y contract.
 *
 * Every adapter co*sumes this model.
 */
export interface InternalQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly offset?: number;

  readonly select: readonly string[];

  readonly filters?: InternalFilterGroup;

  readonly searchFields: readonly string[];

  readonly searchValue?: string;

  readonly sorts: readonly InternalSort[];

  readonly aggregates: readonly InternalAggregate[];

  readonly groupBy: readonly string[];

  readonly distinct: readonly string[];
}

export interface QueryMetadata {
  readonly searchableFields: readonly string[];
  readonly sortableFields: readonly string[];
  readonly filterableFields: readonly string[];
  readonly selectableFields: readonly string[];
  readonly aggregatableFields: readonly string[];
}
