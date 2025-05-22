import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware";
import { todoService } from "../services";
import { HTTP_STATUS, SUCCESS_MESSAGES, APP_CONSTANTS } from "../constants";

// Function to create a new todo
export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId as string;
    const todo = await todoService.createTodo(userId, req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: SUCCESS_MESSAGES.TODO_CREATED,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

// Function to get all todos for a user
export const getTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId as string;

    const options = {
      page:
        Number.parseInt(req.query.page as string) || APP_CONSTANTS.DEFAULT_PAGE,
      limit:
        Number.parseInt(req.query.limit as string) ||
        APP_CONSTANTS.DEFAULT_LIMIT,
      search: req.query.search as string,
      sortBy: req.query.sortBy as string,
      sortOrder: req.query.sortOrder as string,
      completed:
        req.query.completed === "true"
          ? true
          : req.query.completed === "false"
          ? false
          : undefined,
    };

    const result = await todoService.getTodosByUserId(userId, options);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    next(error);
  }
};

// Function to get a todo by its ID
export const getTodoById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId as string;
    const todoId = req.params.id;

    const todo = await todoService.getTodoById(todoId, userId);
    res.status(HTTP_STATUS.OK).json(todo);
  } catch (error) {
    next(error);
  }
};

// Function to update a todo by its ID
export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId as string;
    const todoId = req.params.id;

    const todo = await todoService.updateTodoById(todoId, userId, req.body);
    res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.TODO_UPDATED,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

// Function to delete a todo by its ID
export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId as string;
    const todoId = req.params.id;

    await todoService.deleteTodoById(todoId, userId);
    res.status(HTTP_STATUS.OK).json({
      message: SUCCESS_MESSAGES.TODO_DELETED,
    });
  } catch (error) {
    next(error);
  }
};
