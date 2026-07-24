import type { LogicalOperator } from "../query/contract/logical-operators.js";
import type { FilterRuleDto } from "./filter-rule.dto.js";

/**
 * Recursive filter node.
 */
export interface FilterGroupDto {
  readonly operator: LogicalOperator;
  readonly rules: readonly (FilterRuleDto | FilterGroupDto)[];
}
