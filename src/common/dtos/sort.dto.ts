import { z } from "zod";
import { SORT_DIRECTIONS } from "../query/contract/sort-directions.js";

/**
 * Sort definition.
 */
export const SortDtoSchema = z.object({
  field: z.string().min(1, "Field must not be empty"),
  direction: z.enum(SORT_DIRECTIONS),
});

export type SortDto = z.infer<typeof SortDtoSchema>;
