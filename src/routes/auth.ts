import express, { Request, Response } from "express";
import { userLogin, userRegister } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.get("/login", userLogin);

export default authRouter;
