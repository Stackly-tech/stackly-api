// update-student.dto.ts
import { CreateStudentDto } from "./create-student.dto.js";
import { z } from "zod";

export const UpdateStudentDto = CreateStudentDto.partial();

export type UpdateStudentDto = z.infer<typeof UpdateStudentDto>;