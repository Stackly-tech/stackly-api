import { z } from "zod";

export const CreateUserDto = z.object({});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
