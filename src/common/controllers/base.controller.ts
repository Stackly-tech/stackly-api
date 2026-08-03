import { type Response, type ErrorRequestHandler } from "express";
// base.controller.js

export class BaseController {
  protected ok(res: Response, data: any, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  protected created(
    res: Response,
    data = null,
    message = "Created Successfully",
  ) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  protected accepted(res: Response, data = null, message = "Accepted") {
    return res.status(202).json({
      success: true,
      message,
      data,
    });
  }

  protected noContent(res: Response) {
    return res.status(204).send();
  }

  protected badRequest(res: Response, message = "Bad Request") {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  protected unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message,
    });
  }

  protected forbidden(res: Response, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  }

  protected notFound(res: Response, message = "Resource Not Found") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  protected conflict(res: Response, message = "Resource Conflict") {
    return res.status(409).json({
      success: false,
      message,
    });
  }

  protected unprocessable(
    res: Response,
    message = "Validation Failed",
    err: ErrorRequestHandler,
  ) {
    return res.status(422).json({
      success: false,
      message,
      err,
    });
  }

  protected internalError(res: Response, message = "Internal Server Error") {
    return res.status(500).json({
      success: false,
      message,
    });
  }
}
