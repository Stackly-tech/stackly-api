import type { FilterOperator } from "../query/contract/operators.js";
/**
 * Single filter expression.
 */
export interface FilterRuleDto {
  readonly field: string;
  readonly operator: FilterOperator;
  readonly value?: unknown;
}
