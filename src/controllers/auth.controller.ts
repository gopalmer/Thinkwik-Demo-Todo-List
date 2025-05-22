import type { Request, Response, NextFunction } from "express";
import { authService } from "../services";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../constants";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.createUser(email, password);

    res.status(HTTP_STATUS.CREATED).json({
      message: SUCCESS_MESSAGES.USER_CREATED,
      token,
      user: { email: user.email, id: user._id },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.authenticateUser(email, password);

    res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      token,
      user: { email: user.email, id: user._id },
    });
  } catch (error) {
    next(error);
  }
};
