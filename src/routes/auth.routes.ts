import express from "express";
import { signup, login } from "../controllers/auth.controller";
import { validateSignup, validateLogin } from "../validators/auth.validator";
import { API_ROUTES } from "../constants";

const router = express.Router();

// Routes
router.post(API_ROUTES.AUTH.SIGNUP, validateSignup, signup);
router.post(API_ROUTES.AUTH.LOGIN, validateLogin, login);

export default router;
