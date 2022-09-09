import express, { Request, Response } from "express";
import { check } from "express-validator";
import { userLogin, userRegister } from "../controllers/authController";
import validationErrors from "../middlewares/validationErrors";

const authRouter = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: This is the username
 *          email:
 *            type: string
 *            description: This is the email
 *          password:
 *            type: string
 *            description: This is the password encrypted with bcryptjs. Need to be a minimum of 6 characters
 *        required:
 *          - username
 *          - email
 *          - password
 *        example:
 *          username: Firstname Lastname
 *          email: test@example.com
 *          password: password123
 */

/**
 *  @swagger
 *  /auth/register:
 *    post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       501:
 *         description: Email already registered
 *       200:
 *        description: Registration successful and rerunning with JWT token
 */
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
