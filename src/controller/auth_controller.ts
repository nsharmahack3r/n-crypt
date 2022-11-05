import { Request, Response, NextFunction } from "express";
import { UserInfo, userInfo } from "os";
import User from "../models/user_model";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');

class AuthController{
    static async login(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Bad Request"});
        }
        const user:any = await User.findOne({email:email});
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
                const userJwt = jwt.sign({...user.toJSON}, process.env.TOKEN_SECRET);
                res.cookie('jwt', userJwt, {
                    maxAge: 9000000000,
                    httpOnly: false,
                    secure: false,
                });

                return res.json({jwt: userJwt, user});
            } else {
                return res.status(401).json({error:"Password incorrect"});
            }
        } else {
            return res.status(404).json({error:"User not found"});
        }
    }

    static async signUp(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({error:"Bad Request"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword
        });
        user.save();

        const userJwt = jwt.sign({...user.toJSON}, process.env.TOKEN_SECRET);
        res.cookie('jwt', userJwt, {
            maxAge: 9000000000,
            httpOnly: false,
            secure: false,
        });
        return res.json({jwt: userJwt, user});
    }
}

export default AuthController;