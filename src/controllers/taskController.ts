import { Request, Response } from "express";
import Task from "../models/task";

const createTask = async (req: Request | any, res: Response) => {
	const { name } = req.body;
	const id = req.uid;

	const newTask = new Task({ name, creator: id });

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
		const tasks = await Task.find({ creator: id }).sort({ createdAt: -1 });

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

const updateTask = async (req: Request | any, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const task = await Task.findByIdAndUpdate(id, { name }, { new: true });

		return res.json({
			ok: true,
			msg: "Task updated",
			task,
		});
	} catch (error) {
		return res.status(404).json({
			ok: false,
			msg: "Task not updated",
		});
	}
};

const deleteTask = async (req: Request | any, res: Response) => {
	const { id } = req.params;

	try {
		const task = await Task.findByIdAndRemove(id);

		return res.json({
			ok: true,
			msg: "Task deleted",
			task,
		});
	} catch (error) {
		return res.status(404).json({
			ok: false,
			msg: "Task not deleted",
		});
	}
};

export { createTask, allTask, updateTask, deleteTask };
