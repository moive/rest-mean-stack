import { Request, Response } from "express";

const userLogin = (req: Request, res: Response) => {
	res.send("Auth server controller");
};

export { userLogin };
