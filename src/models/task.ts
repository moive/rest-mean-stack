import { Document, model, Schema, Types } from "mongoose";

interface ITask extends Document {
	name: string;
	creator: Types.ObjectId;
	createdAt: Date;
}

const task = new Schema<ITask>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		trim: true,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export default model<ITask>("Task", task);
