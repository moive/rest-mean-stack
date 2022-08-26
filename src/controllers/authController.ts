import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const userRegister = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			res.status(501).json({ ok: false, msg: "Mail already registered" });
		}

		const newUser = new User({ email, password, username });

		const salt = bcryptjs.genSaltSync(12);
		newUser.password = bcryptjs.hashSync(password, salt);

		await newUser.save();

		const payload = {
			id: newUser.id,
		};

		jwt.sign(
			payload,
			process.env.SECRET!,
			{ expiresIn: 3600 },
			(error, token) => {
				res.json({
					ok: true,
					id: newUser.id,
					username,
					msg: "User created",
					token,
				});
			}
		);
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: "Error when registering",
		});
	}
};

const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			res.status(401).json({
				ok: false,
				msg: "Email is invalid",
			});
		}

		const passwordValid = bcryptjs.compareSync(password, user?.password!);

		if (!passwordValid) {
			res.status(401).json({
				ok: false,
				msg: "Password is not valid",
			});
		}

		const payload = {
			id: user?.id,
		};

		jwt.sign(
			payload,
			process.env.SECRET!,
			{ expiresIn: 3600 },
			(error, token) => {
				res.json({
					ok: true,
					id: user?.id,
					msg: "Session start",
					username: user?.username,
					token,
				});
			}
		);
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: "Error logging in",
		});
	}
};

export { userLogin, userRegister };
