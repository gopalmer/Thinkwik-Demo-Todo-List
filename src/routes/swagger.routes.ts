import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config";

const router = express.Router();

// Swagger Routes
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpec));

export default router;
