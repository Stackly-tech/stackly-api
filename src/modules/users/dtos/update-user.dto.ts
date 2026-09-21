import { CreateUserDto } from "./create-user.dto.js";
import { z } from "zod";

export const UpdateUserDto = CreateUserDto.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
