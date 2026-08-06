// create-student.dto.ts

import { z } from "zod";

export const CreateStudentDto = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.email(),
  course: z.string().min(1).max(100),
  rollNumber: z.string().min(1).max(100),
  year: z.number().int().min(1).max(10),
  phoneNumber: z.string().min(1).max(20),
});

export type CreateStudentDto = z.infer<typeof CreateStudentDto>;
