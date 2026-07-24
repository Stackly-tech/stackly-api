/**
 * Supported logical operators for grouping filter rules.
 *
 * Logical operators are applied to groups rather than
 * individual field comparisons.
 */
export type LogicalOperator = "and" | "or" | "not";

/**
 * Immutable list of supported logical operators.
 *
 * Used by validation services and runtime checks.
 */
export const LOGICAL_OPERATORS = ["and", "or", "not"] as const;

/**
 * Runtime logical operator type.
 */
export type SupportedLogicalOperator = (typeof LOGICAL_OPERATORS)[number];

/**
 * Determines whether a value is a valid logical operator.
 *
 * @param value Value supplied from an external source.
 * @returns True when the operator is supported.
 */
export function isLogicalOperator(
  value: string,
): value is SupportedLogicalOperator {
  return LOGICAL_OPERATORS.includes(value as SupportedLogicalOperator);
}
