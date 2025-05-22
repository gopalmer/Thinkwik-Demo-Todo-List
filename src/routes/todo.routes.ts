import express from "express";
import { todoController } from "../controllers";
import { authenticate } from "../middleware";
import { validateTodoCreate, validateTodoUpdate } from "../validators";

const router = express.Router();

// Apply authentication middleware to all todo routes
router.use(authenticate);

router.post("/", validateTodoCreate, todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", validateTodoUpdate, todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
