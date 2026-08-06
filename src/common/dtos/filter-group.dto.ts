import { z } from "zod";
import { LOGICAL_OPERATORS } from "../query/contract/logical-operators.js";
import { FilterRuleDtoSchema } from "./filter-rule.dto.js";

/**
 * Recursive filter node.
 */
export const FilterGroupDtoSchema = z.lazy((): any =>
  z.object({
    operator: z.enum(LOGICAL_OPERATORS),
    rules: z.array(z.union([FilterRuleDtoSchema, FilterGroupDtoSchema])),
  }),
);

export type FilterGroupDto = z.infer<typeof FilterGroupDtoSchema>;
