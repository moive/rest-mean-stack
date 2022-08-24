import { Router } from "express";
import {
	createTask,
	allTask,
	updateTask,
	deleteTask,
} from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = Router();

taskRouter.post("/create", [verifyToken], createTask);
taskRouter.get("/all", [verifyToken], allTask);
taskRouter.put("/update/:id", [verifyToken], updateTask);
taskRouter.delete("/delete/:id", [verifyToken], deleteTask);

export default taskRouter;
