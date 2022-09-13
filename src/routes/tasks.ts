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

/**
 *  @swagger
 *  /task/all:
 *    get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     parameters:
 *      - name: x-auth-token
 *        in: header
 *        description: JWT token valid
 *        true: true
 *     requestBody:
 *       required: false
 *     responses:
 *       404:
 *         description: The user has no  tasks available
 *       200:
 *        description: List of logged-in user tasks
 */
taskRouter.get("/all", [verifyToken], allTask);

taskRouter.post(
	"/create",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	createTask
);

taskRouter.put(
	"/update/:id",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	updateTask
);
taskRouter.delete("/delete/:id", deleteTask);

export default taskRouter;
