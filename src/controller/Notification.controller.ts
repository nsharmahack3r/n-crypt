import admin from "firebase-admin";
import { ObjectId } from "mongoose";
import { title } from "process";
import User from "../models/user_model";
const serviceAccount = require("../../server-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


class NotificationHandler {
    static async notify(fcmToken:string, title:string, body:string, data:any){
        const notificationTag: string = 'native_notification';

        const androidNotification: admin.messaging.AndroidNotification = {
            channelId: "DEFAULT_CHANNEL",
            clickAction:"FLUTTER_NOTIFICATION_CLICK",
            visibility:'public',
            priority: 'max',
            tag: notificationTag
        };
        const message = {
            token: fcmToken,
            notification:{
                title,
                body
            },
            data:data,
            apns: {
                payload: {
                    aps: {
                        sound:"default",
                        badge:1,
                        contentAvailable:true,
                        mutableContent:true,
                      },
                },
                headers: {
                    "apns-push-type": "background",
                    "apns-priority": "5",
                    "apns-topic": "io.flutter.plugins.firebase.messaging",
                    'apns-collapse-id': notificationTag,
                },
            },
            // android:{
            //     notification:androidNotification
            // }
                      
        };

        admin.messaging().send(message).then((messageID)=>{
            console.log(`notification sent to : ${fcmToken}`);
        });
    }

    static async sendMessageNotification(from:any, to:any, message:string){
        const title = `@${from.username}`;
        const fcmToken = `${to.fcmToken}`;

        const data = {
            sender:`${from._id}`,
            message: message,
            sentAt: new Date(Date.now()).toISOString(),
            receiver: `${to._id}`,


            //User params
            _id: `${from._id}`,
            name: `${from.name}`,
            username:`${from.username}`,
            email:`${from.email}`

        }
        try{
            await NotificationHandler.notify(fcmToken, title, message, data);
        } catch(e){
            console.log(e);
        }
    }
}

export default NotificationHandler;