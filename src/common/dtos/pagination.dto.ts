import { z } from "zod";

/**
 * Client supplied pagination information.
 */
export const PaginationDtoSchema = z.object({
  page: z.number().int().positive("Page must be a positive integer"),
  limit: z.number().int().positive("Limit must be a positive integer"),
});

export type PaginationDto = z.infer<typeof PaginationDtoSchema>;
