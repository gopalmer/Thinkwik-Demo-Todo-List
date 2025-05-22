import { Router } from "express";
import authRoutes from "./auth.routes";
import todoRoutes from "./todo.routes";
import { API_ROUTES } from "../constants";
import swaggerSpec from "./swagger.routes";

const router = Router();
router.use(API_ROUTES.AUTH.BASE, authRoutes);
router.use(API_ROUTES.TODOROUTE.BASE, todoRoutes);

export { router, swaggerSpec };
