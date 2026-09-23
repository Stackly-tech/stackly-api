import { IService } from "#/common/interfaces/IService.js";
import { type Request, type Response } from "express";
import { BaseController } from "#/common/controllers/base.controller.js";
import { S3Storage } from "../../common/storage/s3/s3.storage.js";
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
    const { id } = req.params;
    const file = req.file;
    const key = `users/${id}/avatar/${crypto.randomUUID()}-${file.originalname}`;
    const storage = new S3Storage();
    await storage.upload(key, file?.buffer, file?.mimetype);
    console.log("🚀 ~ UserController ~ id:", id);
    console.log("🚀 ~ UserController ~ data:", file);
    const data = { image: key };

    const result = await this.service.update({
      id,
      data,
    });

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
