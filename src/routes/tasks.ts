import { Router } from "express";
import { createTask } from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const taskRouter = Router();

taskRouter.post("/create", [verifyToken], createTask);

export default taskRouter;
