import { type Response } from "express";
// base.controller.js

export class BaseController {
  protected ok(res: Response, data: any) {
    return res.status(200).json({
      success: true,
      data,
    });
  }

  protected created(res: Response, data: any) {
    return res.status(201).json({
      success: true,
      data,
    });
  }

  protected noContent(res: Response) {
    return res.status(204).send();
  }

  protected success(res: Response, data: any, meta?: any) {
    return res.status(200).json({
      success: true,
      data,
      ...(meta && { meta }),
    });
  }
}
