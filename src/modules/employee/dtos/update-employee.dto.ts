// update-employee.dto.ts
import { CreateEmployeeDto } from "./create-employee.dto.js";
import { z } from "zod";

export const UpdateEmployeeDto = CreateEmployeeDto.partial();

export type UpdateEmployeeDto = z.infer<typeof UpdateEmployeeDto>;
