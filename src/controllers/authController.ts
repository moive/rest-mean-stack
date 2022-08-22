import { Request, Response } from "express";

const userRegister = (req: Request, res: Response) => {
	const { email, password, username } = req.body;
	console.log({ email, password, username });
	res.json({ ok: true, email, username });
};

const userLogin = (req: Request, res: Response) => {
	res.send("Auth server controller");
};

export { userLogin, userRegister };
