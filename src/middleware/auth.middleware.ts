import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { APP_CONSTANTS, HTTP_STATUS, ERROR_MESSAGES } from "../constants";

const JWT_SECRET = process.env.JWT_SECRET || APP_CONSTANTS.DEFAULT_JWT_SECRET;

export interface AuthRequest extends Request {
  userId?: string;
}

// Middleware to authenticate user using JWT
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        ERROR_MESSAGES.AUTHENTICATION_REQUIRED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;

    next();
  } catch (error) {
    next(error);
  }
};
