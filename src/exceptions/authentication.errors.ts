import { AppError } from "./app.error.js";

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Permission denied") {
    super(message, 403);
  }
}

export class TokenExpiredError extends AuthenticationError {
  constructor() {
    super("Token expired");
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super("Invalid email or password");
  }
}

export class AccountLockedError extends AppError {
  constructor() {
    super("Account temporarily locked", 423);
  }
}
