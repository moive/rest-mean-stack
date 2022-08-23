import { Request, Response } from "express";
import task from "../models/task";

const createTask = async (req: Request, res: Response) => {
	const { name } = req.body;

	const newTask = new task({ name });

	await newTask.save();

	res.status(200).json({
		ok: true,
		msg: "Task created successfully",
	});
};

export { createTask };
