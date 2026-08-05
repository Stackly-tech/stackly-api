import { z } from "zod";

/**
 * Global search definition.
 */
export const SearchDtoSchema = z.object({
  value: z.string().min(0, "Search value must not be empty"),
  fields: z
    .array(z.string().min(0, "Field name must not be empty"))
    .min(0, "At least one field is required"),
});

export type SearchDto = z.infer<typeof SearchDtoSchema>;
