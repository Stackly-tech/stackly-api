import { IService } from "#common/interfaces/IService.js";
import { type Request, type Response } from "express";
import { BaseController } from "#common/controllers/base.controller.js";
export class EmployeeController extends BaseController {
  constructor(private employeeService: IService<any>) {
    super();
  }
  findAll = async (req: Request, res: Response) => {};
  findById = async (req: Request, res: Response) => {
    const result = this.employeeService.findById("");
    return;
  };
  create = async (req: Request, res: Response) => {
    const result = this.employeeService.create("");
  };
  update = async (req: Request, res: Response) => {
    const result = this.employeeService.update("");
    return;
  };
  delete = (req: Request, res: Response) => {
    const result = this.employeeService.delete("");
    return;
  };
  patch = (req: Request, res: Response) => {
    const result = this.employeeService.patch("");
    return;
  };
}
