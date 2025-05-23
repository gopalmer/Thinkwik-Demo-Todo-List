export const ERROR_MESSAGES = {
  // Authentication errors
  AUTHENTICATION_REQUIRED: "Authentication required",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_TOKEN: "Invalid or expired token",
  USER_EXISTS: "User already exists",

  // Validation errors
  VALIDATION_ERROR: "Validation Error",
  INVALID_EMAIL: "Please provide a valid email address",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_LENGTH: "Password must be at least 6 characters long",

  // Todo errors
  TODO_NOT_FOUND: "Todo not found",
  INVALID_TODO_ID: "Invalid todo ID",
  TITLE_REQUIRED: "Title is required",
  TITLE_EMPTY: "Title cannot be empty",
  DESCRIPTION_REQUIRED: "Description is required",
  DESCRIPTION_EMPTY: "Description cannot be empty",
  DUE_DATE_REQUIRED: "Due date is required",
  INVALID_DUE_DATE: "Due date must be a valid date",

  // Server errors
  INTERNAL_SERVER_ERROR: "Internal server error",
  DATABASE_ERROR: "Database error occurred",
};

export const SUCCESS_MESSAGES = {
  // Auth success
  USER_CREATED: "User created successfully",
  LOGIN_SUCCESS: "Login successful",

  // Todo success
  TODO_CREATED: "Todo created successfully",
  TODO_UPDATED: "Todo updated successfully",
  TODO_DELETED: "Todo deleted successfully",

  // Server status
  SERVER_RUNNING: "Server is running",
};
