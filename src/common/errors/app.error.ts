export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    options: {
      code: string;
      statusCode?: number;
      details?: unknown;
      isOperational?: boolean;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options.cause });

    this.name = "AppError";
    this.code = options.code;
    this.statusCode = options.statusCode ?? 500;
    this.isOperational = options.isOperational ?? true;
    this.details = options.details;

    Error.captureStackTrace?.(this, AppError);
  }
}
