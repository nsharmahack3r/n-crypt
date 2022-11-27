import { Request, Response, NextFunction } from "express";
import User from "../models/user_model";
import NotificationHandler from "./Notification.controller";

class MessageController{
    static async sendMessage(req: Request, res: Response, next: NextFunction){
        try{
            const { from, to, message } = req.body;

            console.log(req.body);
            if(!from || !to || !message){
                return res.status(404).json({error:"Bad Reques"});
            }
            
            const sender = await User.findById(from);
            const receiver = await User.findById(to);

            if(!sender || !receiver) {
                return res.status(404).json({error:"Bad Reques"});
            }
            
            await NotificationHandler.sendMessageNotification(sender, receiver, `${message}`);
            return res.status(200).json({success:true});
        } catch(e){
            return res.status(404).json({error:"Failed to send message"});
        }
    }
}

export default MessageController;