import { Router } from "express";
import { createTask, allTask, updateTask } from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = Router();

taskRouter.post("/create", [verifyToken], createTask);
taskRouter.get("/all", [verifyToken], allTask);
taskRouter.put("/update/:id", [verifyToken], updateTask);

export default taskRouter;
