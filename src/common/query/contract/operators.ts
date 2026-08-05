/**
 * Supported comparison operators.
 */
export type ComparisonOperator =
  "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "between";

/**
 * Supported collection operators.
 */
export type CollectionOperator = "in" | "notIn";

/**
 * Supported text operators.
 */
export type TextOperator = "contains" | "startsWith" | "endsWith" | "like";

/**
 * Supported boolean operators.
 */
export type BooleanOperator = "isTrue" | "isFalse";

/**
 * Supported null operators.
 */
export type NullOperator = "isNull" | "isNotNull";

/**
 * Union of all supported filter operators.
 *
 * This contract is intentionally ORM-agnostic and can be
 * consumed by any adapter implementation.
 */
export type FilterOperator =
  | ComparisonOperator
  | CollectionOperator
  | TextOperator
  | BooleanOperator
  | NullOperator;

/**
 * Immutable list of supported operators.
 *
 * Used by validation services and runtime checks.
 */
export const FILTER_OPERATORS = [
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "between",
  "in",
  "notIn",
  "contains",
  "startsWith",
  "endsWith",
  "like",
  "isTrue",
  "isFalse",
  "isNull",
  "isNotNull",
] as const;

/**
 * Runtime operator value type.
 */
export type SupportedFilterOperator = (typeof FILTER_OPERATORS)[number];

/**
 * Determines whether a value is a valid filter operator.
 *
 * @param value Operator received from external input.
 * @returns True when operator is supported.
 */
export function isFilterOperator(
  value: string,
): value is SupportedFilterOperator {
  return FILTER_OPERATORS.includes(value as SupportedFilterOperator);
}
