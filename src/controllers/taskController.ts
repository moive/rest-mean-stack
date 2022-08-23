import { Request, Response } from "express";
import task from "../models/task";

const createTask = async (req: Request | any, res: Response) => {
	const { name } = req.body;
	const id = req.uid;

	const newTask = new task({ name, creator: id });

	const t = await newTask.save();

	res.status(200).json({
		ok: true,
		msg: "Task created successfully",
		task: t,
	});
};

export { createTask };
