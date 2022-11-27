import express, { Express } from "express";
import AuthRouter from "./authRouter";
import { currentUser } from "../middlewares/currentUserMiddleWare";
import UserRouter from "./userRoutes";
import MessageRoutes from "./messageRouter";


const app:Express = express();
app.use(currentUser);
app.use('/auth',AuthRouter);
app.use('/user', UserRouter);
app.use('/message', MessageRoutes);

export default app;