import { z } from "zod";
import { FILTER_OPERATORS } from "../query/contract/operators.js";

/**
 * Single filter expression.
 */
export const FilterRuleDtoSchema = z.object({
  field: z.string().min(1, "Field must not be empty"),
  operator: z.enum(FILTER_OPERATORS),
  value: z.unknown().optional(),
});

export type FilterRuleDto = z.infer<typeof FilterRuleDtoSchema>;
