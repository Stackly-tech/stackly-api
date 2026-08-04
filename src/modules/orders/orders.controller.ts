import { IService } from "#common/interfaces/IService.js";
import { type Request, type Response } from "express";
import { BaseController } from "#common/controllers/base.controller.js";
export class OrdersController extends BaseController {
  constructor(private readonly service: IService<any>) {
    super();
  }
  findAll = async (req: Request, res: Response) => {
    const requestQuery =
      Object.keys(req.body ?? {}).length > 0 ? req.body : req.query;
    const result = await this.service.findAll(requestQuery);
    return this.ok(res, result);
  };
  findById = async (req: Request, res: Response) => {
    const result = this.service.findById("");
    return;
  };
  create = async (req: Request, res: Response) => {
    const result = this.service.create("");
  };
  update = async (req: Request, res: Response) => {
    const result = this.service.update("");
    return;
  };
  delete = (req: Request, res: Response) => {
    const result = this.service.delete("");
    return;
  };
  patch = (req: Request, res: Response) => {
    const result = this.service.patch("");
    return;
  };
}
