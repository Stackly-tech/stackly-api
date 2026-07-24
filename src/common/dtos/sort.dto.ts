import type { SortDirection } from "../query/contract/sort-directions.js";
/**
 * Sort definition.
 */
export interface SortDto {
  readonly field: string;
  readonly direction: SortDirection;
}
