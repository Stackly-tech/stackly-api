import { ValidationError } from "./validation.error.js";

export class QueryValidationError extends ValidationError {
  constructor(message: string) {
    super(message);
  }
}
