import { AppError } from "./app.error.js";

export class QueryValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
