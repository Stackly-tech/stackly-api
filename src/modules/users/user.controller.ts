import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { UserWhereInputObjectZodSchema } from "../../generated/zod/schemas/index.js";
import { buildSelect } from "./user.query.js";

import z from "zod";
const jsonString = z.string().transform((value, ctx) => {
  try {
    return JSON.parse(value);
  } catch {
    ctx.addIssue({ code: "custom", message: "filters must be valid JSON" });
    return z.NEVER;
  }
});
const listQuery = z.object({
  filters: jsonString.pipe(UserWhereInputObjectZodSchema.partial()).optional(),
  fields: z
    .string()
    .optional()
    .transform((v) => v?.split(",")),
});

const pageQuery = listQuery.extend({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).optional(),
});
export class UserController {
  constructor(private service: UserService) {}

  list = async (req: Request, res: Response) => {
    const { filters, fields } = listQuery.parse(req.query);
    console.log("🚀 ~ UserController ~ fields:", fields);
    console.log("🚀 ~ UserController ~ filters:", filters);
    const rows = await this.service.listAll({
      where: filters,
      select: buildSelect(fields),
    });
    res.json(rows);
  };

  page = async (req: Request, res: Response) => {
    const { filters, fields, page, pageSize } = pageQuery.parse(req.query);
    console.log("🚀 ~ UserController ~ pageSize:", pageSize);
    console.log("🚀 ~ UserController ~ page:", page);
    console.log("🚀 ~ UserController ~ fields:", fields);
    console.log("🚀 ~ UserController ~ filters:", filters);
    const result = await this.service.listPage({
      where: filters,
      select: buildSelect(fields),
      page,
      pageSize,
    });
    res.json(result);
  };
  createItem = async (req: Request, res: Response) => {};
  updateItem = async (req: Request, res: Response) => {};
  patchItem = async (req: Request, res: Response) => {};
  deleteItem = async (req: Request, res: Response) => {};
}
