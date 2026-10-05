// common/errors/rest-error-handler.ts

import type { Request, Response, NextFunction } from "express";
import { toAppError } from "#/common/errors/error.mapper.js";
import { logger } from "#/integrations/index.js";
export function restErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const appError = toAppError(error);

  logger.error(
    {
      error,
      code: appError.code,
      requestId: req.id,
    },
    "Request failed",
  );

  res.status(appError.statusCode).json({
    error: {
      code: appError.code,
      message: appError.message,
      requestId: req.id,
      ...(appError.details !== undefined && {
        details: appError.details,
      }),
    },
  });
}
