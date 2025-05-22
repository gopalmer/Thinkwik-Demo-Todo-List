import jwt from "jsonwebtoken";
import { User } from "../models";
import { AppError } from "../middleware/error.middleware";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Create a new user
export const createUser = async (email: string, password: string) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(ERROR_MESSAGES.USER_EXISTS, HTTP_STATUS.CONFLICT);
  }

  const user = new User({ email, password });
  await user.save();

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

  return { user, token };
};

// Authenticate user
export const authenticateUser = async (email: string, password: string) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  // Generate token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
  return { user, token };
};
