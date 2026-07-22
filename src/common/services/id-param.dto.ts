// get-employee.dto.ts

import { z } from "zod";

export const IdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});

export type IdParamDto = z.infer<typeof IdParamDto>;
