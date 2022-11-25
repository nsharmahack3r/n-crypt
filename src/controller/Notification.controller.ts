import admin from "firebase-admin";
import { ObjectId } from "mongoose";
import User from "../models/user_model";
const serviceAccount = require("../../server-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


class NotificationHandler {
    static async notify(){
        const notificationTag: string = 'native_notification';

        const androidConfig: admin.messaging.AndroidNotification = {
            priority: 'max', 
            channelId: "DEFAULT_CHANNEL",
            clickAction:"FLUTTER_NOTIFICATION_CLICK",
            //icon: AndroidNotificationIcon.followerIcon,
            //color: "#673BB7",
            visibility:'public',
            tag: notificationTag
        };
    }
}

export default NotificationHandler;