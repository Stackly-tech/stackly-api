import { type BaseServiceInterface } from "#services/base.service.interface.js";
import { type Request, type Response } from "express";
import { BaseController } from "./base.controller.js";
export class EmployeeController extends BaseController {
  constructor(private employeeService: BaseServiceInterface<any>) {
    super();
  }
  findAll = async (req: Request, res: Response) => {
    const result = await this.employeeService.findAll();
    return this.ok(res, result);
  };
  findById = async (req: Request, res: Response) => {
    const result = this.employeeService.findById(req.query.id);
    return;
  };
  create = async (req: Request, res: Response) => {
    const result = this.employeeService.create(req.body);
  };
  update = async (req: Request, res: Response) => {
    const result = this.employeeService.update(req.body);
    return;
  };
  delete = (req: Request, res: Response) => {
    const result = this.employeeService.delete(req.query.id);
    return;
  };
  patch = (req: Request, res: Response) => {
    const data = {
      id: req.query.id,
      value: req.body,
    };
    const result = this.employeeService.patch(data);
    return;
  };
}
