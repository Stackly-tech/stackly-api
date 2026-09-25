import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
export class UserController {
  constructor(private service: UserService) {}
  getItems = async (req: Request, res: Response) => {
    const result = await this.service.getItems(req.body);
    res.status(200).json(result);
  };
  createItem = async (req: Request, res: Response) => {};
  updateItem = async (req: Request, res: Response) => {};
  patchItem = async (req: Request, res: Response) => {};
  deleteItem = async (req: Request, res: Response) => {};
}
