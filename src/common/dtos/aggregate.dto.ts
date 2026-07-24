import type { AggregateFunction } from "../query/contract/aggregate-functions.js";

/**
 * Aggregate definition.
 */
export interface AggregateDto {
  readonly function: AggregateFunction;
  readonly field: string;
  readonly alias: string;
}
