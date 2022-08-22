import express, { Request, Response } from "express";
import { userLogin } from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/login", userLogin);

export default authRouter;
