/**
 * Supported aggregate functions.
 */
export type AggregateFunction = "count" | "sum" | "avg" | "min" | "max";

/**
 * Immutable aggregate function list.
 */
export const AGGREGATE_FUNCTIONS = [
  "count",
  "sum",
  "avg",
  "min",
  "max",
] as const;

/**
 * Runtime aggregate function type.
 */
export type SupportedAggregateFunction = (typeof AGGREGATE_FUNCTIONS)[number];

/**
 * Runtime aggregate validation.
 */
export function isAggregateFunction(
  value: string,
): value is SupportedAggregateFunction {
  return AGGREGATE_FUNCTIONS.includes(value as SupportedAggregateFunction);
}
