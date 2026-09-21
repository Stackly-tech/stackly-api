import { z } from "zod";
import { QueryDtoSchema } from "#/common/dtos/query.dto.js";

export const ListUsersDto = QueryDtoSchema.extend({});

export type ListUsersDto = z.infer<typeof ListUsersDto>;
