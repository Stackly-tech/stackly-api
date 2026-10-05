// common/errors/error-mapper.ts

import { AppError } from "#/common/errors/app.error.js";
import { ErrorCode } from "#/common/errors/error.codes.js";

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError("Internal server error", {
      code: ErrorCode.INTERNAL_ERROR,
      statusCode: 500,
      isOperational: false,
      cause: error,
    });
  }

  return new AppError("Internal server error", {
    code: ErrorCode.INTERNAL_ERROR,
    statusCode: 500,
    isOperational: false,
    cause: error,
  });
}
