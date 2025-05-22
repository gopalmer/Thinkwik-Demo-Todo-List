import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config";
import { swaggerSpec, router } from "./routes";
import { API_ROUTES } from "./constants";
import { errorHandler } from "./middleware";
import { errors } from "celebrate";
import { setupCronJobs } from "./utils";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(API_ROUTES.BASE, router);

// Swagger documentation
app.use("/api-docs", swaggerSpec);

// celebrate error handling
app.use(errors());

// Global error handler
app.use(errorHandler);

// Cron jobs
setupCronJobs();
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
