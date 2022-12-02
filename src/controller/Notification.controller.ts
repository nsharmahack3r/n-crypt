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

        // const androidConfig: admin.messaging.AndroidNotification = {
        //     priority: 'max', 
        //     channelId: "DEFAULT_CHANNEL",
        //     clickAction:"FLUTTER_NOTIFICATION_CLICK",
        //     visibility:'public',
        //     tag: notificationTag
        // };

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
        }
        await NotificationHandler.notify(fcmToken, title, message, data);
    }
}

export default NotificationHandler;