import express, { Request, Response } from "express";
import { check } from "express-validator";
import { userLogin, userRegister } from "../controllers/authController";
import validationErrors from "../middlewares/validationErrors";

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
		validationErrors,
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
		validationErrors,
	],
	userLogin
);

export default authRouter;
