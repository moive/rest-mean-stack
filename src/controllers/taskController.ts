import { Request, Response } from "express";
import task from "../models/task";

const createTask = async (req: Request | any, res: Response) => {
	const { name } = req.body;
	const id = req.uid;

	const newTask = new task({ name, creator: id });

	await newTask.save();

	res.status(200).json({
		ok: true,
		msg: "Task created successfully",
		task: newTask,
	});
};

const allTask = async (req: Request | any, res: Response) => {
	const id = req.uid;

	try {
		const tasks = await task.find({ creator: id }).sort({ createdAt: -1 });

		return res.status(200).json({
			ok: true,
			tasks,
		});
	} catch (error) {
		return res.status(404).json({
			ok: false,
			msg: "Task not found",
		});
	}
};

export { createTask, allTask };
