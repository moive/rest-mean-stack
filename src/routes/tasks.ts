import { Router } from "express";
import { createTask, allTask } from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = Router();

taskRouter.post("/create", [verifyToken], createTask);
taskRouter.get("/all", [verifyToken], allTask);

export default taskRouter;
