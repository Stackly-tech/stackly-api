import { IService } from "#/common/interfaces/IService.js";
import { type Request, type Response } from "express";
import { BaseController } from "#/common/controllers/base.controller.js";

export class UserController extends BaseController {
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
    const { id } = req.params;
    const requestQuery =
      Object.keys(req.body ?? {}).length > 0 ? req.body : req.query;
    const result = await this.service.findById(id, requestQuery);

    return this.ok(res, result);
  };

  query = async (req: Request, res: Response) => {
    const requestQuery =
      Object.keys(req.body ?? {}).length > 0 ? req.body : req.query;
    const result = await this.service.query(requestQuery);

    return this.ok(res, result);
  };

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return this.created(res, result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.update(req.body);
    return this.ok(res, result);
  };

  remove = async (req: Request, res: Response) => {
    const result = await this.service.delete(req.params.id);
    return this.ok(res, result);
  };

  patch = async (req: Request, res: Response) => {
    const result = await this.service.patch(req.body);
    return this.ok(res, result);
  };
}
