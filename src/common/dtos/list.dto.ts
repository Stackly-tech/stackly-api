import { z } from "zod";
export const ListDto = z.object({
  page: z.coerce.number().default(1),

  pageSize: z.coerce.number().default(20),

  search: z.string().optional(),

  sortBy: z.string().optional(),

  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
