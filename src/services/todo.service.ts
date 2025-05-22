import { Todo } from "../models";
import { AppError } from "../middleware/error.middleware";
import mongoose from "mongoose";
import { APP_CONSTANTS, HTTP_STATUS, ERROR_MESSAGES } from "../constants";

interface TodoData {
  title?: string;
  description?: string;
  dueDate?: Date | string;
  completed?: boolean;
}

interface TodoQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  completed?: boolean;
}

export const createTodo = async (userId: string, todoData: TodoData) => {
  const todo = new Todo({
    ...todoData,
    user: userId,
  });

  await todo.save();
  return todo;
};

export const getTodosByUserId = async (
  userId: string,
  options: TodoQueryOptions = {}
) => {
  // Pagination
  const page = options.page || APP_CONSTANTS.DEFAULT_PAGE;
  const limit = options.limit || APP_CONSTANTS.DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = { user: userId };

  // Add search if provided
  if (options.search) {
    query.$or = [
      { title: { $regex: options.search, $options: "i" } },
      { description: { $regex: options.search, $options: "i" } },
    ];
  }

  // Filter by completion status if provided
  if (options.completed !== undefined) {
    query.completed = options.completed;
  }

  // Sorting
  const sortField = options.sortBy || "dueDate";
  const sortOrder = options.sortOrder === "desc" ? -1 : 1;
  const sort: [string, 1 | -1][] = [[sortField, sortOrder]];

  // Execute query with pagination and sorting
  const todos = await Todo.find(query).sort(sort).skip(skip).limit(limit);

  // Get total count for pagination
  const total = await Todo.countDocuments(query);

  return {
    todos,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getTodoById = async (todoId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new AppError(ERROR_MESSAGES.INVALID_TODO_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
    throw new AppError(ERROR_MESSAGES.TODO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return todo;
};

export const updateTodoById = async (
  todoId: string,
  userId: string,
  updates: TodoData
) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new AppError(ERROR_MESSAGES.INVALID_TODO_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const todo = await Todo.findOne({ _id: todoId, user: userId });
  if (!todo) {
    throw new AppError(ERROR_MESSAGES.TODO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  // Update fields
  if (updates.title !== undefined) todo.title = updates.title;
  if (updates.description !== undefined) todo.description = updates.description;
  if (updates.dueDate !== undefined) todo.dueDate = new Date(updates.dueDate);
  if (updates.completed !== undefined) todo.completed = updates.completed;

  await todo.save();
  return todo;
};

export const deleteTodoById = async (todoId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new AppError(ERROR_MESSAGES.INVALID_TODO_ID, HTTP_STATUS.BAD_REQUEST);
  }

  const todo = await Todo.findOneAndDelete({ _id: todoId, user: userId });
  if (!todo) {
    throw new AppError(ERROR_MESSAGES.TODO_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return todo;
};

export const updateExpiredTodos = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const result = await Todo.updateMany(
    {
      dueDate: { $lt: yesterday },
      completed: false,
    },
    {
      $set: { completed: true },
    }
  );

  return result.modifiedCount;
};
