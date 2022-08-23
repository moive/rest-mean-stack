import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
	const token = req.header("x-auth-token");

	if (!token) {
		res.status(401).json({
			ok: false,
			msg: "Invalid token",
		});
	}

	try {
		const payload: any = jwt.verify(token!, process.env.SECRET!);

		req.uid = payload.id;

		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: "Invalid token",
		});
	}
};

export default verifyToken;
