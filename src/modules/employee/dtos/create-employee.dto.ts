// create-employee.dto.ts

import { z } from "zod";

export const CreateEmployeeDto = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email(),
  department: z.string().min(1).max(100),
  jobTitle: z.string().min(1).max(100),
});

export type CreateEmployeeDto = z.infer<typeof CreateEmployeeDto>;
