import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

export interface AppError extends Error {
  statusCode: number;
  errors?: any[];
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  // Handle celebrate/joi validation errors
  if (err.name === "ValidationError" || err.name === "CelebrateError") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: ERROR_MESSAGES.VALIDATION_ERROR,
      errors: err.errors || [err.message],
    });
    return;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
    return;
  }

  // Handle custom errors
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({ message });
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
