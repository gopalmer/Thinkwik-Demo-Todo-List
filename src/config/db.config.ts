import mongoose from "mongoose";

// DB Connection Configuration
export const connectDB = async (): Promise<void> => {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/todo-api";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
