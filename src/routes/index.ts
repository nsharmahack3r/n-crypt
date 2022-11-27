import express, { Express } from "express";
import AuthRouter from "./authRouter";
import { currentUser } from "../middlewares/currentUserMiddleWare";
import UserRouter from "./userRoutes";

const app:Express = express();
app.use(currentUser);
app.use('/auth',AuthRouter);
app.use('/user', UserRouter);

export default app;