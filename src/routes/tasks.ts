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

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Task:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: This is the name
 *          creator:
 *            type: User
 *            description: This is the ID of the user
 *          createdAt:
 *            type: date
 *            description: This is the date of creation
 *        required:
 *          - name
 *          - creator
 *        example:
 *          name: Application name
 *          creator: 165g16d4fg1df54gert45
 */
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
