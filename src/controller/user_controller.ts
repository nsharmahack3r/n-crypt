import { Request, Response, NextFunction } from "express";
import User from "../models/user_model";

class UserController{
    static async getUsers(req: Request, res: Response, next: NextFunction){
        const users = await User.find();
        if(users){
            return res.status(200).json({users:users});
        }
        return res.status(400).json({error:"Something went wrong"});
    }
}

export default UserController;