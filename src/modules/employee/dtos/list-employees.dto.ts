// get-employees.dto.ts

import { z } from "zod";
import { ListDto } from "#common/services/list.dto.js";
import { type Employee } from "#generated/prisma/client.js";
type EmployeeFields = {
  [K in keyof Partial<Employee>]: z.ZodType;
};
export const ListEmployeeDto = ListDto.extend({
  department: z.any(),
} satisfies EmployeeFields);

export type ListEmployeeDto = z.infer<typeof ListEmployeeDto>;
