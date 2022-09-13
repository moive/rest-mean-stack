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

/**
 *  @swagger
 *  /task/create:
 *    post:
 *     summary: Create a new task
 *     tags: [Task]
 *     parameters:
 *      - name: x-auth-token
 *        in: header
 *        description: JWT token valid
 *        true: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  name: string
 *                  description: The task name
 *     responses:
 *       200:
 *        description: Task created successfully
 */

taskRouter.post(
	"/create",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	createTask
);

/**
 *  @swagger
 *  /task//update/{id}:
 *    put:
 *     summary: Update a task
 *     tags: [Task]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id of the task to update
 *        true: true
 *      - name: x-auth-token
 *        in: header
 *        description: JWT token valid
 *        true: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  name: string
 *                  description: The new task name
 *     responses:
 *       404:
 *        description: The task you are trying tu actualice does not exist
 *       200:
 *        description: Task updated successfully
 */
taskRouter.put(
	"/update/:id",
	[check("name", "Name is required").not().isEmpty(), verifyToken],
	validationErrors,
	updateTask
);

/**
 *  @swagger
 *  /task//delete/{id}:
 *    delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id of the task to update
 *        true: true
 *      - name: x-auth-token
 *        in: header
 *        description: JWT token valid
 *        true: true
 *     requestBody:
 *       required: false
 *     responses:
 *       404:
 *        description: The task you are trying tu delete does not exist
 *       200:
 *        description: Task deleted successfully
 */
taskRouter.delete("/delete/:id", deleteTask);

export default taskRouter;
