import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validationErrors = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(501).json({
			ok: false,
			errors: errors.mapped(),
		});
	}

	return next();
};
export default validationErrors;
