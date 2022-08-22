import { Schema, model } from "mongoose";

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
}

const User = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		unique: true,
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default model<IUser>("User", User);
