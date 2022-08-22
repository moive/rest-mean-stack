import { Request, Response } from "express";
import User from "../models/user";

const userRegister = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			res.status(501).json({ ok: false, msg: "Mail already registered" });
		}

		const newUser = new User({ email, password, username });

		await newUser.save();

		res.json({
			ok: true,
			email,
			username,
			password,
			msg: "User created",
		});
	} catch (error) {
		console.log(error);
		res.json({
			ok: false,
			msg: "Error when registering",
		});
	}
};

const userLogin = (req: Request, res: Response) => {
	res.send("Auth server controller");
};

export { userLogin, userRegister };
