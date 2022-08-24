import { Router } from "express";
import { check } from "express-validator";
import {
	createTask,
	allTask,
	updateTask,
	deleteTask,
} from "../controllers/taskController";
import validationErrors from "../middlewares/validationErrors";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = Router();

taskRouter.post(
	"/create",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	createTask
);
taskRouter.get("/all", [verifyToken], allTask);
taskRouter.put(
	"/update/:id",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	updateTask
);
taskRouter.delete("/delete/:id", deleteTask);

export default taskRouter;
