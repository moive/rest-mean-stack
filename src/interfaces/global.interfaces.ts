import { Request } from "express";
import jwt from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request {
	uid: string;
}
