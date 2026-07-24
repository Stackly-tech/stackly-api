/**
 * Supported sort directions.
 *
 * These values are intentionally ORM-agnostic and database-agnostic.
 */
export type SortDirection = "asc" | "desc";

/**
 * Immutable list of supported sort directions.
 *
 * Used by validation services and runtime checks.
 */
export const SORT_DIRECTIONS = ["asc", "desc"] as const;

/**
 * Runtime sort direction type.
 */
export type SupportedSortDirection = (typeof SORT_DIRECTIONS)[number];

/**
 * Determines whether a value is a valid sort direction.
 *
 * @param value Value received from an external source.
 * @returns True when the value is a supported sort direction.
 */
export function isSortDirection(
  value: string,
): value is SupportedSortDirection {
  return SORT_DIRECTIONS.includes(value as SupportedSortDirection);
}
