import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
export class UserController {
  constructor(private service: UserService) {}
  async getItems(req: Request, res: Response) {
    const { filters, sortBy, include, page, pageSize } = req.body;
    const where = UserWhereInputSchema.partial().parse(filters ?? {}); // validated, real Zod-inferred type

    const queryObj = {};
    const loginObj = {};
    const result = this.service.getItems(req, queryObj, loginObj);
    res.status(200).json(result);
  }
  async createItem(req: Request, res: Response) {}
  async updateItem(req: Request, res: Response) {}
  async patchItem(req: Request, res: Response) {}
  async deleteItem(req: Request, res: Response) {}
}
