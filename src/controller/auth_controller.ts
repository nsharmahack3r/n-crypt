import { Request, Response, NextFunction } from "express";
import { UserInfo, userInfo } from "os";
import User from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
// import ErrorHandler from "../utils/ErrorHandler";

dotenv.config();
class AuthController{
    static async login(req: Request, res: Response, next: NextFunction){
       try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Bad Request"});
        }
        const user:any = await User.findOne({email:email});
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
                const userJwt = jwt.sign({...user.toJSON} , process.env.TOKEN_SECRET as string);
                res.cookie('jwt', userJwt, {
                    maxAge: 9000000000,
                    httpOnly: false,
                    secure: false,
                });

                return res.json({jwt: userJwt, user}
                );
            } else {
                return res.status(401).json({error:"Password incorrect"});
            }
        } else {
            return res.status(404).json({error:"User not found"});
        }

       }catch(e){
            return res.status(404).json({error:"An error occured"});
       }
    }

    // const {email, password} = req.body;
    //     if(!email || !password){
    //         return next(new ErrorHandler("Please enter email & password", 400));
    //     }
    //     const user:any = await User.findOne({email:email});
    //     if(user){
    //         const validPassword = await bcrypt.compare(password, user.password);
    //         if(validPassword){
    //             const userJwt = jwt.sign({...user.toJSON} , process.env.TOKEN_SECRET as string);
    //             res.cookie('jwt', userJwt, {
    //                 maxAge: 9000000000,
    //                 httpOnly: false,
    //                 secure: false,
    //             });

    //             return res.json({jwt: userJwt, user}
    //             );
    //         } else {
    //             return next(new ErrorHandler("Password incorrect", 400));

    //         }
    //     } else {
    //         return next(new ErrorHandler("User Not found", 400));

    //     }

   

static async signUp(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({error:"Bad Request"});
            }
            if(password.length? password.length < 8 : false){
                return res.status(400).json({error:"Please enter at least 8 charcater password"});
            }



            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                password: hashedPassword
            });
            await user.save();

            const userJwt = jwt.sign({...user.toJSON}, `${process.env.TOKEN_SECRET}`);
            res.cookie('jwt', userJwt, {
                maxAge: 9000000000,
                httpOnly: false,
                secure: false,
            });
            return res.json({jwt: userJwt, user});
        }catch(e){
            res.status(400).json({error:"User Already Exists!"});
        }

    //     const {email, password} = req.body;
    //     if(!email || !password){
    //         return next(new ErrorHandler("Please enter email & password", 400));
    //     }
    //     if(password.length? password.length < 8 : false){
    //         return next(new ErrorHandler("Password must contain at least 8 characters", 400))
    //     }
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     const user = new User({
    //         email,
    //         password: hashedPassword
    //     });
    //     await user.save();

    //     const userJwt = jwt.sign({...user.toJSON}, `${process.env.TOKEN_SECRET}`);
    //     res.cookie('jwt', userJwt, {
    //         maxAge: 9000000000,
    //         httpOnly: false,
    //         secure: false,
    //     });
    //     return res.json({jwt: userJwt, user});


    }
}

export default AuthController;