import { Router } from "express";
import authRoutes from "./auth.routes";
import { API_ROUTES } from "../constants";

const router = Router();
router.use(API_ROUTES.AUTH.BASE, authRoutes);
//
export default router;
