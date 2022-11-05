import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import User from '../models/user_model';

interface UserPayload {
    id?:string;
	email: string;
    avatar?: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const token = req?.headers.authorization;
	if (!token) {
		return next();
	}
	try {
		const payload = jwt.verify(token, process.env.TOKEN_SECRET!) as UserPayload;
		const user = await User.findById(payload.id!);
		if (user) {
			req.currentUser = user;
		}
	} catch (err) {
		console.error(err);
	}
	next();
};