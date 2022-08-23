import express, { Request, Response } from "express";
import { check } from "express-validator";
import { userLogin, userRegister } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post(
	"/register",
	[
		check("email", "Email is required").not().isEmpty(),
		check("email", "Invalid format").isEmail(),
		check(
			"password",
			"The password must be at least 6 characters long"
		).isLength({ min: 6 }),
		check("username", "Username is required").not().isEmpty(),
	],
	userRegister
);
authRouter.post(
	"/login",
	[
		check("email", "Email is required").not().isEmpty(),
		check("email", "Invalid format").isEmail(),
		check(
			"password",
			"The password must be at least 6 characters long"
		).isLength({ min: 6 }),
	],
	userLogin
);

export default authRouter;
