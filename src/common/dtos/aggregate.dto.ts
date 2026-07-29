import { z } from "zod";
import { AGGREGATE_FUNCTIONS } from "../query/contract/aggregate-functions.js";

/**
 * Aggregate definition.
 */
export const AggregateDtoSchema = z.object({
  function: z.enum(AGGREGATE_FUNCTIONS),
  field: z.string().min(1, "Field must not be empty"),
  alias: z.string().min(1, "Alias must not be empty"),
});

export type AggregateDto = z.infer<typeof AggregateDtoSchema>;
