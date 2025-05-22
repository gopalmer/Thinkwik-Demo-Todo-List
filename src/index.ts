import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config";
import routes from "./routes";
import { API_ROUTES } from "./constants";
import { errorHandler } from "./middleware";
import { errors } from "celebrate";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(API_ROUTES.BASE, routes);

// celebrate error handling
app.use(errors());

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
